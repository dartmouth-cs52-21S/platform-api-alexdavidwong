import Post from '../models/post_model';

export const createPost = async (postFields) => {
  try {
    const newPost = new Post();
    newPost.title = postFields.title;
    newPost.tags = postFields.tags;
    newPost.content = postFields.content;
    newPost.coverUrl = postFields.coverUrl;

    const savedPost = await newPost.save();
    return savedPost;
  } catch (error) {
    throw new Error(`create post error: ${error}`);
  }
};

export const getPosts = async () => {
  const result = await Post.find({}).select('-content');
  return result;
};

export const getPost = async (id) => {
  try {
    const result = await Post.findById(id);
    return result;
  } catch (error) {
    throw new Error(`getting individual post error: ${error}`);
  }
};

export const deletePost = async (id) => {
  try {
    const result = await Post.findByIdAndDelete(id);
    return result;
  } catch (error) {
    throw new Error(`deleting post error ${error}`);
  }
};
export const updatePost = async (id, postFields) => {
  try {
    const result = await Post.findByIdAndUpdate(id, postFields, { new: true });
    return result;
  } catch (error) {
    throw new Error(`updating post error ${error}`);
  }
};
