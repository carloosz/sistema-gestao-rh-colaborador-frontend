import { IAttribute } from './Attribute';

export interface ITerms extends IAttribute {
  terms: string;
  policy: string;
}
