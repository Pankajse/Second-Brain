import mongoose from "mongoose";

type Type = "Image"|"Video"|"Link"|'Tweet'

interface ContentData {
    link : string;
    type : Type;
    title : string;
    tags? : mongoose.Types.ObjectId[];
    userId : mongoose.Types.ObjectId;
}

const contentSchema = new mongoose.Schema<ContentData>({
    link : {
        type : String,
        required : true
    },
    type : {
        type : String,
        enum : ['Image', 'Video', 'Link', 'Tweet'],
        required : true
    },
    title : {
        type : String,
        required : true
    },
    tags : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Tags"
    }],
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
},{
    timestamps : true
});

const ContentModel = mongoose.model("Content",contentSchema);

export default ContentModel; 