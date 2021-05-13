/* eslint-disable no-unused-vars */
import { Router } from 'express';
import * as Posts from './controllers/post_controllers';

const router = Router();

// fetching all the posts
const handleAllPosts = async (req, res) => {
  try {
    const result = await Posts.getPosts();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// creating new post
const handleNewPost = async (req, res) => {
  try {
    const result = await Posts.createPost(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// getting an individual post
const handlePost = async (req, res) => {
  try {
    const result = await Posts.getPost(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// updating a post
const handleUpdates = async (req, res) => {
  try {
    const result = await Posts.updatePost(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// deleting a post
const handleDelete = async (req, res) => {
  try {
    const result = await Posts.deletePost(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

router.route('/posts')
  .get(handleAllPosts)
  .post(handleNewPost);

router.route('/posts/:id')
  .put(handleUpdates)
  .get(handlePost)
  .delete(handleDelete);

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

export default router;
