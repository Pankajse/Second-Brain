import express from "express";
import cors from 'cors';
import { contentValidation, signValidation, type ContentType, type UserType } from "./middleware/validation.js";
import UserModel from "./models/user.js";
import ContentModel from "./models/content.js";
import mongoose from "mongoose";
import { config } from "./config.js";
import { auth } from "./middleware/auth.js";
import TagModel from "./models/tag.js";
import LinkModel from "./models/link.js";
import { generateRandomString, getYouTubeVideoId, extractTweetId } from "./util.js";

mongoose.connect(config.DB_URL).then(() => {
    console.log("Connect to MongoDB");
}).catch(() => {
    console.log("Error connecting to MongoDB");
});
const app = express();
app.use(cors());
app.use(express.json());
export enum statusCodes {
    Success = 200,
    NotFound = 403,
    ServerError = 500
}

app.post("/signup", async (req, res) => {
    const parseResult = signValidation.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(statusCodes.NotFound).json({ msg: "Wrong Input", error: parseResult.error })
    }
    try {
        const { username, password }: UserType = parseResult.data;
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(statusCodes.NotFound).json({ msg: "Username already created" });
        }
        const hashPassword = await UserModel.hashPassword(password)
        const userResponse = await UserModel.create({ username, password: hashPassword });
        if (!userResponse) {
            return res.status(statusCodes.NotFound).json({ msg: "User Not created" });
        }
        const token = userResponse.generateAuthToken();
        return res.status(statusCodes.Success).json({ msg: "User created successfully", user: userResponse, token: token });
    } catch (error) {
        console.log(error);
        return res.status(statusCodes.ServerError).json({ msg: "Internal Server Error" });
    }
});

app.post("/signin", async (req, res) => {
    const parseResult = signValidation.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(statusCodes.NotFound).json({ msg: "Wrong Input", error: parseResult.error })
    }
    try {
        const { username, password }: UserType = parseResult.data;
        const userResponse = await UserModel.findOne({ username }).select("+password");
        if (!userResponse) {
            return res.status(statusCodes.NotFound).json({ msg: "User Not Found" });
        }
        const match = await userResponse.matchPassword(password)
        if (!match) {
            return res.status(statusCodes.NotFound).json({ msg: "Incorrect Password" })
        }
        const token = userResponse.generateAuthToken();
        return res.status(statusCodes.Success).json({ msg: "SignIn successfully", user: userResponse, token: token });
    } catch (error) {
        console.log(error);
        return res.status(statusCodes.ServerError).json({ msg: "Internal Server Error" });
    }
})


app.post("/content", auth, async (req, res) => {
    const parseResult = contentValidation.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(statusCodes.NotFound).json({ msg: "Wrong Input", error: parseResult.error });
    }
    try {
        const userId = req.userId;
        const { link, title, type, tags }: ContentType = parseResult.data;
        let contentResponse , tagIds;
        if (!tags || tags.length===0 || tags[0] === "") {
            contentResponse = await ContentModel.create({ userId, link, title, type });
        } else {
            tagIds = await Promise.all(tags.map(async tag => {
                let findTag = await TagModel.findOne({ tag });
                if (!findTag) {
                    findTag = await TagModel.create({ tag });
                }
                return findTag._id.toString();
            }));
            let newLink = link;
            if(type === "Video"){
                const resp = getYouTubeVideoId(link)
                if(resp === null){
                    return res.status(statusCodes.NotFound).json({ msg: "Content not created" });
                }else{
                    newLink = resp;
                }
            }
            else if(type === "Tweet"){
                newLink = extractTweetId(link)
            }
            contentResponse = await ContentModel.create({ userId, link:newLink, title, type, tags: tagIds });
        }
        if (!contentResponse) {
            return res.status(statusCodes.NotFound).json({ msg: "Content not created" });
        }
        return res.status(statusCodes.Success).json({ msg: "Content created successfully", Content: contentResponse });
    } catch (error) {
        console.log(error);
        return res.status(statusCodes.ServerError).json({ msg: "Internal Server Error" });
    }
});

app.get("/content", auth, async (req, res) => {
    try {
        const userId = req.userId;
        const contentRes = await ContentModel.find({ userId }).populate("userId tags");
        const content = contentRes.map((x)=> ({
            title : x.title,
            link : x.link,
            type : x.type,
            id : x._id,
            tags: x.tags?.map((t) => (typeof t === "object" && "tag" in t ? t.tag : t.toString())),
            //@ts-ignore
            timeStamp: new Date(x.createdAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }),
        }));
        return res.status(statusCodes.Success).json({ msg: "Content fetched Successfully", content })
    } catch (error) {
        console.log(error);
        return res.status(statusCodes.ServerError).json({ msg: "Internal Server Error" });
    }
})

app.delete("/content", auth, async (req, res) => {
    try {
        const userId = req.userId;
        const { contentId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            return res.status(statusCodes.NotFound).json({ msg: "Wrong Content Id" })
        }
        await ContentModel.deleteOne({ _id: contentId, userId });
        return res.status(statusCodes.Success).json({ msg: "Content deleted Successfully" })
    } catch (error) {
        console.log(error);
        return res.status(statusCodes.ServerError).json({ msg: "Internal Server Error" });
    }
})

app.post("/brain/share", auth, async (req, res) => {
    try {
        const userId = req.userId;
        const share = req.body.share;
        if (share === true) {
            const isExist = await LinkModel.findOne({ userId });
            if (isExist) {
                return res.status(statusCodes.Success).json({ msg: "Link already created", link: isExist.link });
            }
            const link = generateRandomString(10);
            const response = await LinkModel.create({ userId, link });
            if (response) {
                return res.status(statusCodes.Success).json({ msg: "Link created", link: response.link });
            }
        } else {
            await LinkModel.deleteOne({ userId });
            return res.status(statusCodes.Success).json({ msg: "Link deleted successfully" });
        }
        return res.status(statusCodes.NotFound).json({ msg: "Server Error" });

    } catch (error) {
        console.log(error);
        return res.status(statusCodes.ServerError).json({ msg: "Internal Server Error" });
    }
})

app.get("/brain/:shareLink", async (req, res) => {
    try {
        const link = req.params.shareLink;
        const linkRes = await LinkModel.findOne({ link }).populate("userId").select("username");
        if (!linkRes) {
            return res.status(statusCodes.NotFound).json({ msg: "Wrong Link" })
        }
        
        const userId = linkRes.userId._id;
        const contentRes = await ContentModel.find({ userId }).populate("userId tags", "username tag");
        const content = contentRes.map((x)=> ({
            title : x.title,
            link : x.link,
            type : x.type,
            id : x._id,
            tags: x.tags?.map((t) => (typeof t === "object" && "tag" in t ? t.tag : t.toString())),
            //@ts-ignore
            timeStamp: new Date(x.createdAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }),
        }))
        //@ts-ignore
        const username = linkRes.userId.username;
        res.status(statusCodes.Success).json({ msg: "Content fetched successfully",username ,content })
    } catch (error) {
        console.log(error);
        return res.status(statusCodes.ServerError).json({ msg: "Internal Server Error" });
    }
});



const port = config.PORT | 3000;
app.listen(port, () => {
    console.log("Server is running on port " + port)
})