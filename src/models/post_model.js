import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field
const PostSchema = new Schema({
  title: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  authorName: String,
  tags: Array,
  content: String,
  coverUrl: String,
});

// create PostModel class from schema
const PostModel = mongoose.model('Post', PostSchema, 'post');

export default PostModel;
