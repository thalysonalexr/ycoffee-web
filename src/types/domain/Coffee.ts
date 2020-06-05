import { Image } from './Image';

interface Author {
  id: string;
  name: string;
  avatar?: Image;
}

export interface CoffeeModel {
  id: string;
  type: string;
  description: string;
  ingredients: string[];
  preparation: string;
  updatedAt: string;
  createdAt: string;
  timePrepare?: number;
  portions?: number;
  image?: Image;
  author?: Author;
}

export interface PaginationCoffees {
  coffees: CoffeeModel[];
  pages: number;
  total: number;
}
