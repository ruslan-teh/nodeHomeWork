import { getManager } from 'typeorm';
import { IToken, IUser } from '../interface';
import { Tokens } from '../entity/Tokens';

class TokenRepository {
    public async createToken(token: {userId: number, accessToken: string, refreshToken: string}): Promise<IToken> {
        return getManager().getRepository(Tokens).save(token);
    }

    public async findTokenByParams(findObject: Partial<IToken>): Promise<IToken | undefined> {
        return getManager().getRepository(Tokens).findOne(findObject);
    }

    public async deleteTokenByParams(findObject: Partial<IUser>) {
        return getManager().getRepository(Tokens).delete(findObject);
    }
}

export const tokenRepository = new TokenRepository();
