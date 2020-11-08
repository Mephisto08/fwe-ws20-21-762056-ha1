import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn} from 'typeorm';
import {Task} from './Task';

// eslint-disable-next-line new-cap
@Entity()
/**
 * Class Label
 */
export class Label {
  /**
   * Auto Increment
   */
    // eslint-disable-next-line new-cap
    @PrimaryGeneratedColumn()
    labelid: number;

    // eslint-disable-next-line new-cap
    @Column()
    name: string;
    // eslint-disable-next-line new-cap
    @CreateDateColumn()
    createdAt: string;

    // eslint-disable-next-line new-cap
    @UpdateDateColumn()
    updatedAt: string;

    // eslint-disable-next-line new-cap
    @ManyToMany(() => Task, (task) => task.labels)
    tasks: Task[];
}
