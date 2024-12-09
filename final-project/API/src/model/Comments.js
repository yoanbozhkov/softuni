const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    commentCreator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    commentForPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts",
      },
  },
  { timestamps: { createdAt: "created_at" } }
);

const Comments = mongoose.model(
  "Comments",
  commentsSchema
);

module.exports = Comments;
