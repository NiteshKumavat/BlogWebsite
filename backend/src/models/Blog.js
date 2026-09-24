import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        content: {
            type: String,
            required: true
        },

        excerpt: {
            type: String,
            maxlength: 300
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        coverImage: {
            type: String
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        tags: [
            {
                type: String,
                trim: true,
                lowercase: true
            }
        ],

        status: {
            type: String,
            enum: ["draft", "published", "archived"],
            default: "draft"
        },

        views: {
            type: Number,
            default: 0
        },

        likes: {
            type: Number,
            default: 0
        },

        comments: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },

                text: {
                    type: String,
                    required: true,
                    trim: true
                },

                createdAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ],

        publishedAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

const Blog = new mongoose.model("Blog", blogSchema);
export default Blog;