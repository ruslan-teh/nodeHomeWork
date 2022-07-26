import { ICommonFields } from './commonFieldsInterface';

export interface IToken extends ICommonFields{
    refreshToken: string,
    accessToken: string,
    userId: number
}

export interface ITokenPair {
    refreshToken: string,
    accessToken: string
}

export interface ITokeDataToSave {
    refreshToken: string,
    accessToken: string,
    userId: number
}

export interface IUserPayload {
    userId: number,
    email: string
}

export type ITokenData = ITokenPair & IUserPayload;
