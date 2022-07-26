import { ITokenData, IUser } from '../interface';
import { userService } from './userService';
import { tokenService } from './tokenService';

class AuthService {
    public async registration(body: IUser): Promise<ITokenData> {
        const { email } = body;

        const userFromDB = await userService.getUserByEmail(email);

        if (userFromDB) {
            throw new Error('user is exist');
        }

        const createdUser = await userService.createUser(body);

        return this._getTokenData(createdUser);
    }

    private async _getTokenData(userData: IUser): Promise<ITokenData> {
        const { id, email } = userData;

        const generateTokenPair = await tokenService.createToken({ userId: id, email });

        await tokenService.saveToken(id, generateTokenPair.accessToken, generateTokenPair.refreshToken);

        return {
            ...generateTokenPair,
            userId: id,
            email,
        };
    }
}

export const authService = new AuthService();
