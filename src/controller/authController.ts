import { NextFunction, Request, Response } from 'express';
import { ITokenData, IUser } from '../interface';
import { authService, tokenService, userService } from '../service';
import { IRequestExtended } from '../interface/requestExtendedInterface';
import { tokenRepository } from '../repositories';
// import { emailService } from '../service/emailService';
// import { emailActionEnum } from '../constants';

class AuthController {
    public async registration(req: Request, res: Response, next: NextFunction): Promise<Response<ITokenData> | undefined> {
        try {
            return res.json(await authService.registration(req.body));
        } catch (e) {
            next(e);
        }
    }

    public async login(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id, email, password: hashPassword } = req.user as IUser;
            const { password } = req.body;

            // await emailService.sendMail(email, emailActionEnum.WELCOME);
            await userService.compareUserPassword(password, hashPassword);

            const { accessToken, refreshToken } = tokenService.createToken({ userId: id, email });

            await tokenRepository.createToken({ userId: id, refreshToken, accessToken });

            return res.json({
                accessToken,
                refreshToken,
                user: req.user,
            });
        } catch (e) {
            next(e);
        }
    }

    public async logout(req: IRequestExtended, res: Response, next: NextFunction): Promise<Response<string> | undefined> {
        try {
            const { id } = req.user as IUser;

            await tokenService.deleteTokenPairByParams({ userId: id });
            return res.json('tokens Delete');
        } catch (e) {
            next(e);
        }
    }

    public async refreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id, email } = req.user as IUser;

            const refreshTokenToDelete = req.get('Authorization');

            await tokenService.deleteTokenPairByParams({ refreshToken: refreshTokenToDelete });

            const { refreshToken, accessToken } = await tokenService.createToken({ userId: id, email });

            await tokenService.saveToken(id, accessToken, refreshToken);

            return res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
