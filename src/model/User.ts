import mongoose , {Schema , Document, mongo} from "mongoose";
import { boolean } from "zod";

export interface Message extends Document{
    Content:string,
    CreatedAt:Date
}
const MessageSchema:Schema<Message> = new Schema({
    Content:{
        type:String,
        required:true
    },
    CreatedAt:{
        type:Date,
        required:true,
        dafault:Date.now
    }
})


export interface User extends Document{
    username:string,
    email:string,
    password:string,
    verifyCode:string,
    verifyCodeExpiry:Date,
    isVerified:boolean,
    isAcceptingMessages:boolean,
    messages:Message[]
}
const UserSchema : Schema<User> = new Schema({
    username:{
        type:String,
        required:[true , "Username is required"],
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:[true , "Email is required"],
        unique:true,
        match:[/^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"[^\r\n"]*")@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/ , "please enter valid email"]
    },
    password:{
        type:String,
        required:[true , "Password is required"],
    },
    verifyCode:{
        type:String,
        required:[true , "Verify code is required"],
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true , "Verify code expiry is required"],   
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAcceptingMessages:{
        type:Boolean,
        default:true,
    },
    messages:{
        type:[MessageSchema]
    }
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>('User', UserSchema)) ;