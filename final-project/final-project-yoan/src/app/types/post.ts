import { User } from './user';

export interface Post {
  _id: string;
  title: string;
  description: string;
  postCreator: User;
  postComments: string[];
  created_at: string;
  updatedAt: string;
}
