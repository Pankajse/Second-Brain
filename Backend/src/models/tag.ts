import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    tag : {
        type : String,
        required : true
    }
});

const TagModel = mongoose.model("Tags",tagSchema);
export default TagModel;