import { User } from './user';

export type Blog = {
  id: number;
  title: string;
  content: string;
  user?: User
}
