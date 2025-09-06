import mongoose from "mongoose";


const linkSchema = new mongoose.Schema({
    link : {
        type : String,
        required : true,
        unique : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    }
});

const LinkModel = mongoose.model("Links",linkSchema);
export default LinkModel;