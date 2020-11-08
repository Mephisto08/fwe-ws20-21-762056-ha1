import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class Task{
    @PrimaryGeneratedColumn()
    taskid: number;

    @Column({nullable:false})
    name: string;

    @Column({nullable:false})
    description: string;
    
    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}