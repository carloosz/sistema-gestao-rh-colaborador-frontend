import { IAttribute } from './Attribute';

export interface IUser extends IAttribute {
  email: string;
  blocked: boolean;
}

export interface IUserResponse {
  list: IUser[];
  page: number;
  count: number;
  total: number;
  totalPages: number;
}

export interface ICompanyUserResponse {
  availableQuantity: number | null;
  list: IUser[];
  page: number;
  count: number;
  total: number;
  totalPages: number;
}
