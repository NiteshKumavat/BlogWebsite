import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
        unique : true
    },

    bio : {
        type : String,
        maxlength : [500, "Bio cannot exceed 500 characters"],
        trim : true
    },

    avatar : {
        type : String, 
        trim : true
    },

    location : {
        type : String, 
        trim : true
    },

    SocialLinks : [
        {
            _id : false,
            name : {
                type : String,
                required : true,
                trim : true
            },

            url : {
                type : String,
                required : true
            }
        }
    ]
}, {timestamps: true });

const Profile = new mongoose.model("Profile", ProfileSchema);
export default Profile;