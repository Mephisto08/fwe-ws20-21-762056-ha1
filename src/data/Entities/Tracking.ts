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
    trackingid: number;

    // eslint-disable-next-line new-cap
    @Column()
    name: string;

    // eslint-disable-next-line new-cap
    @Column({type: 'time', nullable: true})
    timestart: string;

    // eslint-disable-next-line new-cap
    @Column({type: 'time', nullable: true})
    timeend: string;

    // eslint-disable-next-line new-cap
    @CreateDateColumn()
    createdAt: string;

    // eslint-disable-next-line new-cap
    @UpdateDateColumn()
    updatedAt: string;
}
