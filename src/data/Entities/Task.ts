import {Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  UpdateDateColumn} from 'typeorm';
import {Label} from './Label';

// eslint-disable-next-line new-cap
@Entity()
/**
 * Class Task
 */
export class Task {
  /**
   * Auto Increment
   */
    // eslint-disable-next-line new-cap
    @PrimaryGeneratedColumn()
    taskid: number;

    // eslint-disable-next-line new-cap
    @Column()
    name: string;

    // eslint-disable-next-line new-cap
    @Column()
    description: string;

    // eslint-disable-next-line new-cap
    @CreateDateColumn()
    createdAt: string;

    // eslint-disable-next-line new-cap
    @UpdateDateColumn()
    updatedAt: string;

    // eslint-disable-next-line new-cap
    @ManyToMany(() => Label, (label) => label.tasks)
    // eslint-disable-next-line new-cap
    @JoinTable()
    labels: Label[];
}
