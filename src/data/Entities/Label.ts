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
    labelId: number;

    // eslint-disable-next-line new-cap
    @Column()
    name: string;

    // eslint-disable-next-line new-cap
    @CreateDateColumn()
    created: string;

    // eslint-disable-next-line new-cap
    @UpdateDateColumn()
    updated: string;

    // eslint-disable-next-line new-cap
    @ManyToMany(() => Task, (task) => task.labels)
    tasks: Promise<Task[]>;
}
