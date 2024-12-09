const Post = require("../model/Posts");
const Comment = require("../model/Comments");

const getLatestPosts = async () => {
  return await Post.find().sort({ created_at: -1 }).limit(10).populate();
};

const getCommentsForPost = async (postId) => {
  const comments = await Comment.find({ commentForPost: postId });
  return comments;
};

const createPost = async (post) => {
  const createdPost = await Post.create({ ...post });
  return createdPost;
};

const createComment = async (postId, content) => {
  const newComment = await Comment.create({
    content,
    commentForPost: postId,
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
  await Comment.deleteMany({ commentForPost: postId });

  const post = await Post.findByIdAndDelete(postId);

  return post;
};

const deleteComment = async (commentId) => {
  const comment = await Comment.findByIdAndDelete(commentId);
  return comment;
};

const TennisForumService = {
  getLatestPosts,
  createPost,
  updatePost,
  deletePost,
  getCommentsForPost,
  createComment,
  updateComment,
  deleteComment,
};

module.exports = TennisForumService;
