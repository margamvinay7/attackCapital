import Post from "../models/postSchema.js";
import { postSchema } from "../utils/validators.js";

export const createPost = async (req, res) => {
  try {
    const validatedPost = postSchema.parse(req.body);
    const post = new Post({
      title: validatedPost.title,
      content: validatedPost.content,
      authorId: req.user.id,
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.errors || "Invalid data" });
  }
};

export const getPosts = async (req, res) => {
  const { author } = req.query;
  const query = author ? { authorId: author } : {};
  const posts = await Post.find(query)
    .populate("authorId", "email")
    .sort({ createdAt: -1 });
  res.json(posts);
};
