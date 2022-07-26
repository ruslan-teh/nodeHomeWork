import { Request, Response } from 'express';
import { IUser } from '../interface';
import { userService } from '../service';

class UserController {
    public async createUser(req: Request, res: Response): Promise<Response<IUser>> {
        const createdUser = await userService.createUser(req.body);
        return res.json(createdUser);
    }

    public async getUserById(req:Request, res: Response): Promise<Response<IUser>> {
        const { id } = req.params;
        const userFromDb = await userService.getUserById(id);
        return res.json(userFromDb);
    }
}

export const userController = new UserController();
