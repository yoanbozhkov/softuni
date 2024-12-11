const { isAuth } = require("../middleware/authMiddleware");
const tennisForumService = require("../services/tennisForumService");

const router = require("express").Router();

// Get Latest Posts
router.get("/latest", async (_req, res) => {
  try {
    const latestPosts = await tennisForumService.getLatestPosts();
    res.status(200).send(latestPosts);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Get single Post
router.get("/:id/", async (req, res) => {
  const postId = req.params.id;
  try {
    const commentsForPost = await tennisForumService.getPostById(postId);
    res.status(200).send(commentsForPost);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Get single Comment
router.get("/comment/:commentId", isAuth, async (req, res) => {
  const commentId = req.params.commentId;
  try {
    const comment = await tennisForumService.getCommentById(commentId);
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Get Comments for a single Post
router.get("/:id/comments", isAuth, async (req, res) => {
  const postId = req.params.id;
  try {
    const commentsForPost = await tennisForumService.getCommentsForPost(postId);
    res.status(200).send(commentsForPost);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Create a Post
router.post("/", isAuth, async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user._id;

  try {
    const createdPost = await tennisForumService.createPost({
      title,
      description,
      postCreator: userId,
    });

    res.status(200).send(createdPost);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Create a Comment within a Post
router.post("/:id/comment", isAuth, async (req, res) => {
  const { content } = req.body;
  const postId = req.params.id;
  const userId = req.user._id;

  try {
    const createComment = await tennisForumService.createComment(
      postId,
      content,
      userId
    );

    res.status(200).send(createComment);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Updates a Post
router.put("/:id", isAuth, async (req, res) => {
  const postId = req.params.id;
  const { title, description } = req.body;

  try {
    const post = await tennisForumService.getPostById(postId);

    if (req?.user._id != post.postCreator) {
      res.status(401).send("Not Authorized");
      return;
    }

    const updatedPost = await tennisForumService.updatePost(
      postId,
      title,
      description
    );

    res.status(200).send(updatedPost);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Updates a Comment
router.put("/comments/:id", isAuth, async (req, res) => {
  const commentId = req.params.id;
  const { content } = req.body;

  try {
    const comment = await tennisForumService.getCommentById(commentId);

    if (req?.user._id != comment.commentCreator) {
      res.status(401).send("Not Authorized");
      return;
    }

    const updatedPost = await tennisForumService.updateComment(
      commentId,
      content
    );

    res.status(200).send(updatedPost);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Delete a Post
router.delete("/:id", isAuth, async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await tennisForumService.getPostById(postId);
    if (req?.user._id != post.postCreator) {
      res.status(401).send("Not Authorized");
      return;
    }
    const deletePost = await tennisForumService.deletePost(postId);
    res.status(200).send(deletePost);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Delete a Comment
router.delete("/:postId/comments/:id", isAuth, async (req, res) => {
  const commentId = req.params.id;
  const postId = req.params.postId;
  try {
    const comment = await tennisForumService.getCommentById(commentId);

    if (req?.user._id != comment.commentCreator) {
      res.status(401).send("Not Authorized");
      return;
    }

    const deletedComment = await tennisForumService.deleteComment(
      commentId,
      postId
    );
    res.status(200).send(deletedComment);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = tennisForumController = router;
