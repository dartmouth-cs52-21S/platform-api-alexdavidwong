import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field
const PostSchema = new Schema({
  title: String,
  tags: String,
  content: String,
  coverUrl: String,
});

// do not need virtuals because not computing anything that is not stored

// create PostModel class from schema
const PostModel = mongoose.model('Post', PostSchema, 'post');

export default PostModel;
