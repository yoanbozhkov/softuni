const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    postCreator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postComments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: { createdAt: "created_at" } }
);

const Post = mongoose.model("Post", postsSchema);
module.exports = Post;
