import { Router } from 'express';
import * as Posts from './controllers/post_controllers';
import * as UserController from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';

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
    const result = await Posts.createPost(req.body, req.user);
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

router.post('/signin', requireSignin, async (req, res) => {
  try {
    const token = UserController.signin(req.user);
    res.json({ token, email: req.user.email });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const token = await UserController.signup(req.body);
    res.json({ token, email: req.body.email });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.route('/posts')
  .get(handleAllPosts)
  .post(requireAuth, handleNewPost);

router.route('/posts/:id')
  .put(requireAuth, handleUpdates)
  .get(handlePost)
  .delete(requireAuth, handleDelete);

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

export default router;
