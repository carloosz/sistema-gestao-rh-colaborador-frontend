import { IAttribute } from './Attribute';
import { IWeekDays } from './WeekDays';

export interface IClient extends IAttribute {
  name: string;
  isActive: boolean;
  cpf: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  registrationNumber: string;
  zipCode: string;
  address: string;
  state: string;
  city: string;
  neighborhood: string;
  number: string;
  admissionDate: string;
  natureOfThePosition: string;
  sector: string;
  Cbo: string;
  startingSalary: number;
  paymentMethod: string;
  daysOfwork: IWeekDays[];
  initialHour: string;
  finalHour: string;
  lunchInitialHour: string;
  lunchFinalHour: string;
  dismissalDate: string;
  dismissalObservation: string;
  typeOfTermination: string;
}

export interface IClientList {
  users: IClient[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  totalThisPage: number;
}
