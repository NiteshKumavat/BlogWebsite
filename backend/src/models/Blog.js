import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: [200, "Title cannot exceed 200 characters"]
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
            maxlength: [300, "Excerpt cannot exceed 300 characters"],
            trim: true
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        coverImage: {
            type: String,
            trim: true
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
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

        publishedAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;