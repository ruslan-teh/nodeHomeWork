import { Column, Entity } from 'typeorm';
import { CommonFields } from './CommonFields';
import { IUser } from '../interface';
import { config } from '../config';

@Entity('Users', { database: config.MYSQL_DATABASE_NAME })
export class Users extends CommonFields implements IUser {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        firstName: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        lastName: string;

    @Column({
        type: 'int',
    })
        age: number;

    @Column({
        type: 'varchar',
        width: 255,
        unique: true,
        nullable: false,
    })
        phone: string;

    @Column({
        type: 'varchar',
        unique: true,
        nullable: false,
    })
        email: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        password: string;
}
