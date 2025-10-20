import { IAttribute } from './Attribute';

export interface IFile extends IAttribute {
  name: string;
  mime: string;
  url: string;
}
