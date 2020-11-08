import {Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn} from 'typeorm';

// eslint-disable-next-line new-cap
@Entity()
/**
 * Class Tracking
 */
export class Tracking {
  /**
   * Auto Increment
   */
    // eslint-disable-next-line new-cap
    @PrimaryGeneratedColumn()
    trackingId: number;

    // eslint-disable-next-line new-cap
    @Column()
    name: string;

    // eslint-disable-next-line new-cap
    @CreateDateColumn()
    created: string;

    // eslint-disable-next-line new-cap
    @UpdateDateColumn()
    updatet: string;

    // eslint-disable-next-line new-cap
    @Column({type: 'time', nullable: true})
    timeStart: string;

    // eslint-disable-next-line new-cap
    @Column({type: 'time', nullable: true})
    timeEnd: string;
}
