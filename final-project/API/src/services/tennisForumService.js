const Post = require("../model/Post");
const Comment = require("../model/Comment");

const getLatestPosts = async () => {
  return await Post.find().sort({ created_at: -1 }).limit(10).populate();
};

const getCommentsForPost = async (postId) => {
  const comments = await Post.find({ postComments: postId });
  return comments;
};

const getCommentById = async (id) => {
  return await Comment.findById(id);
};

const getPostById = async (id) => {
  return await Post.findById(id);
};
const createPost = async (post) => {
  const createdPost = await Post.create({ ...post });
  return createdPost;
};

const createComment = async (postId, content, userId) => {
  const newComment = await Comment.create({
    content,
    commentForPost: postId,
    commentCreator: userId,
  });

  await Post.findByIdAndUpdate(postId, {
    $push: { postComments: newComment._id },
  });
  return newComment;
};

const updatePost = async (postId, newTitle, newDescription) => {
  const post = await Post.findByIdAndUpdate(
    postId,
    { title: newTitle, description: newDescription },
    { new: true }
  );

  return post;
};

const updateComment = async (commentId, newContent) => {
  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    { content: newContent },
    { new: true }
  );
  return updatedComment;
};

const deletePost = async (postId) => {
  const postDeleted = await Post.findByIdAndDelete(postId);
  await Comment.deleteMany({ _id: { $in: [...postDeleted.postComments] } });
};

const deleteComment = async (commentId, postId) => {
  await Comment.findByIdAndDelete(commentId);

  await Post.findByIdAndUpdate(postId, {
    $pull: { postComments: commentId },
  });
};

const TennisForumService = {
  getLatestPosts,
  getCommentById,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getCommentsForPost,
  createComment,
  updateComment,
  deleteComment,
};

module.exports = TennisForumService;
