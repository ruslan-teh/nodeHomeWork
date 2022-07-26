import { Router } from 'express';
import { userController } from '../controller';

const router = Router();

router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);

export const userRouter = router;
