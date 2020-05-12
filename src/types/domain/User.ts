import { Image } from './Image';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  avatar?: Image;
};

export interface UserAuth {
  user: User;
  token: string;
}
