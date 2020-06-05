import { Image } from './Image';

export interface UserModel {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  avatar?: Image;
}

export interface UserAuth {
  user: UserModel;
  token: string;
}
