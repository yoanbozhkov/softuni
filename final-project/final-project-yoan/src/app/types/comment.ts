import { Post } from './post';
import { User } from './user';

export interface Comment {
  _id: string;
  content: string;
  commentCreator: User;
  commentForPost: Post;
  created_at: string;
  updatedAt: string;
}
