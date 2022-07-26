import { getManager } from 'typeorm';
import { IUser } from '../interface';
import { Users } from '../entity';

class UserRepository {
    public async createUser(body: IUser): Promise<IUser> {
        return getManager().getRepository(Users).save(body);
    }

    public async getUserById(id: string): Promise<IUser | undefined> {
        return getManager().getRepository(Users)
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }

    getUserByEmail(email: string): Promise<IUser | undefined> {
        return getManager().getRepository(Users)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }
}

export const userRepository = new UserRepository();
