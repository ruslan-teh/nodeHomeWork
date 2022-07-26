import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interface/requestExtendedInterface';
import { tokenService, userService } from '../service';
import { tokenRepository } from '../repositories';
import { authValidator } from '../validators';
import { ErrorHandler } from '../error';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const accessToken = req.get('Authorization');

            if (!accessToken) {
                next(new ErrorHandler('no token'));
                return;
            }

            const { email } = tokenService.verifyToken(accessToken);

            const tokenPairFromDB = await tokenRepository.findTokenByParams({ accessToken });

            if (!tokenPairFromDB) {
                next(new ErrorHandler('token not valid'));
                return;
            }

            const userFromToken = await userService.getUserByEmail(email);

            if (!userFromToken) {
                next(new ErrorHandler('token not valid'));
                return;
            }

            req.user = userFromToken;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkRefreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.get('Authorization');

            if (!refreshToken) {
                next(new ErrorHandler('no token'));
                return;
            }

            const { email } = tokenService.verifyToken(refreshToken);

            const tokenPairFromDB = await tokenRepository.findTokenByParams({ refreshToken });

            if (!tokenPairFromDB) {
                next(new ErrorHandler('token not valid'));
                return;
            }

            const userFromToken = await userService.getUserByEmail(email);

            if (!userFromToken) {
                next(new ErrorHandler('token not valid'));
                return;
            }

            req.user = userFromToken;

            next();
        } catch (e) {
            next(e);
        }
    }

    //    validators
    public isEmailValid(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { error, value } = authValidator.login.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }
            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
