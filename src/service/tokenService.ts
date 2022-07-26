import jwt from 'jsonwebtoken';

import { DeleteResult } from 'typeorm';
import { IToken, ITokenPair, IUserPayload } from '../interface';
import { tokenRepository } from '../repositories';
import { config } from '../config';

class TokenService {
    public createToken(payload: IUserPayload): ITokenPair {
        const accessToken = jwt.sign(
            payload,
            config.SECRET_ACCESS_KEY as string,
            { expiresIn: config.EXPIRES_IN_ACCESS },
        );
        const refreshToken = jwt.sign(
            payload,
            config.SECRET_REFRESH_KEY as string,
            { expiresIn: config.EXPIRES_IN_REFRESH },
        );

        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveToken(userId: number, accessToken: string, refreshToken: string): Promise<IToken> {
        const tokenFromDB = await tokenRepository.findTokenByParams({ userId });

        if (tokenFromDB) {
            tokenFromDB.refreshToken = refreshToken;
            tokenFromDB.accessToken = accessToken;
            return tokenRepository.createToken(tokenFromDB);
        }

        return tokenRepository.createToken({ userId, accessToken, refreshToken });
    }

    public async deleteTokenPairByParams(filterObject: Partial<IToken>): Promise<DeleteResult> {
        return tokenRepository.deleteTokenByParams(filterObject);
    }

    verifyToken(authToken: string, type = 'access'): IUserPayload {
        let secretWord = 'access';

        if (type === 'refresh') {
            secretWord = 'refresh';
        }

        return jwt.verify(authToken, secretWord as string) as IUserPayload;
    }
}

export const tokenService = new TokenService();
