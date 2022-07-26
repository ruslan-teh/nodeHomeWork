import {
    Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn,
} from 'typeorm';
import { ICommonFields } from '../interface/commonFieldsInterface';

export class CommonFields implements ICommonFields {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
        id: number;

    @Column({
        nullable: false,
        default: Date.now(),
    })
    @CreateDateColumn({ type: 'timestamp' })
        createdAt: string;

    @Column()
    @DeleteDateColumn({
        type: 'timestamp',
    })
        deletedAt?: string;
}
