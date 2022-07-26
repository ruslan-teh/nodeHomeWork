import { ICommonFields } from './commonFieldsInterface';

export interface IUser extends ICommonFields{
    firstName: string,
    lastName: string,
    age: number,
    phone: string,
    email: string,
    password: string
}
