import {Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {Task} from './Task'

@Entity()
export class Label{
    @PrimaryGeneratedColumn()
    labelid: number;

    @Column({nullable:false})
    name: string;
    
    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @ManyToMany(() => Task)
    @JoinTable()
    tasks: Task[];
}