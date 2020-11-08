import {Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import {Label} from './Label';
import {Tracking} from './Tracking';

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
    taskId: number;

    // eslint-disable-next-line new-cap
    @Column()
    name: string;

    // eslint-disable-next-line new-cap
    @Column()
    description: string;

    // eslint-disable-next-line new-cap
    @CreateDateColumn()
    created: string;

    // eslint-disable-next-line new-cap
    @UpdateDateColumn()
    updated: string;

    // eslint-disable-next-line new-cap
    @ManyToMany(() => Label, (label) => label.tasks)
    // eslint-disable-next-line new-cap
    @JoinTable()
    labels: Promise<Label[]>;

    // eslint-disable-next-line new-cap
    @ManyToOne(() => Tracking)
    // eslint-disable-next-line new-cap
    @JoinTable()
    trackings: Promise<Tracking[]>;
}
