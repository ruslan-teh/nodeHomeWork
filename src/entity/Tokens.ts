import {
    Column, Entity, OneToOne, JoinColumn,
} from 'typeorm';
import { CommonFields } from './CommonFields';
import { IToken } from '../interface';
import { Users } from './Users';
import { config } from '../config';

@Entity('Tokens', { database: config.MYSQL_DATABASE_NAME })
export class Tokens extends CommonFields implements IToken {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        accessToken: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        refreshToken: string;

    @Column({
        type: 'int',
        nullable: false,
    })
        userId: number;

    @OneToOne(() => Users)
    @JoinColumn({ name: 'userId' })
        users: Users;
}
