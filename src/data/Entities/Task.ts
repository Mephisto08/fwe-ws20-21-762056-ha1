import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class Task{
    @PrimaryGeneratedColumn()
    taskid: number;

    @Column()
    name: string;

    @Column()
    description: string;
    
    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}