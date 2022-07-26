import { Request } from 'express';
import { IUser } from './userInterface';

export interface IRequestExtended extends Request {
    user?: IUser
}
