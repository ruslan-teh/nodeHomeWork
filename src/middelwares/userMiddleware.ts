import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interface/requestExtendedInterface';
import { userService } from '../service';
import { ErrorHandler } from '../error';

class UserMiddleware {
    public async checkIsUserExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email } = req.body;

            const userFromDB = await userService.getUserByEmail(email);

            if (!userFromDB) {
                next(new ErrorHandler('user not exist', 404));
                return;
            }
            req.user = userFromDB;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
