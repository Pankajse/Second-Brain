import mongoose, {Model} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {config} from "../config.js"

interface User {
    username : string;
    password : string
}

interface UserMethods {
    generateAuthToken() : string;
    matchPassword(password : string) : Promise<boolean>;
}

interface UserModelType extends Model<User, {}, UserMethods> {
  hashPassword(password: string): Promise<string>;
}

const userSchema = new mongoose.Schema<User, UserModelType, UserMethods>({
    username : {
        type : String,
        unique : true,
        required : true,
        minLength : [3,"Minimum username Length should be 8"],
        maxLength : [20,"Maximum username Length should be 20"]
    },
    password : {
        type : String,
        required : true,
        select : false
    }
})


userSchema.methods.generateAuthToken = function(){
    return jwt.sign({_id : this._id},config.JWT_SECRET);
}

userSchema.statics.hashPassword = async(password : string)=>{
    return await bcrypt.hash(password,10);
}

userSchema.methods.matchPassword = async function(password : string){
    return await bcrypt.compare(password,this.password);
}
const UserModel = mongoose.model<User, UserModelType>("User",userSchema);
export default UserModel;