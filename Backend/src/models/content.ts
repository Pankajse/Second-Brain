import mongoose from "mongoose";

type Type = "image"|"video"|"article"|"audio"|'youtube'|'tweet'

interface ContentData {
    link : string;
    type : Type;
    title : string;
    tags : mongoose.Types.ObjectId[];
    userId : mongoose.Types.ObjectId;
}

const contentSchema = new mongoose.Schema<ContentData>({
    link : {
        type : String,
        required : true,
    },
    type : {
        type : String,
        enum : ['image', 'video', 'article', 'audio','youtube' , 'tweet'],
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
});

const ContentModel = mongoose.model("Content",contentSchema);

export default ContentModel; 