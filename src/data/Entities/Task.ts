import {Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  UpdateDateColumn} from 'typeorm';
import {Label} from './Label';

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

    @ManyToMany(() => Label, label => label.tasks)
    @JoinTable ()
    labels: Label[];
}