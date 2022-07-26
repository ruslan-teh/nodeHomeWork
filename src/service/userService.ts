import bcrypt from 'bcrypt';

import { IUser } from '../interface';
import { userRepository } from '../repositories';

class UserService {
    public async createUser(body: IUser): Promise<IUser> {
        const { password } = body;
        const hashedPassword = await this._hashPassword(password);
        const userDataToSave = { ...body, password: hashedPassword };
        return userRepository.createUser(userDataToSave);
    }

    public async getUserById(id: string): Promise<IUser | undefined> {
        return userRepository.getUserById(id);
    }

    public async getUserByEmail(email: string) {
        return userRepository.getUserByEmail(email);
    }

    public async compareUserPassword(password: string, hashPassword: string) {
        const isPasswordUniq = bcrypt.compare(password, hashPassword);

        if (!isPasswordUniq) {
            throw new Error('User not exist');
        }
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();
