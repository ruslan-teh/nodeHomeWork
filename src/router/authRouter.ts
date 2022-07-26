import { Router } from 'express';

import { authController } from '../controller';
import { authMiddleware, userMiddleware } from '../middelwares';

const router = Router();

router.post('/registration', authController.registration);
router.post('/login', authMiddleware.isEmailValid, userMiddleware.checkIsUserExist, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);

export const authRouter = router;
