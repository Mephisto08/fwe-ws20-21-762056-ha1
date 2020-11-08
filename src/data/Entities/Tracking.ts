import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class Tracking{
    @PrimaryGeneratedColumn()
    trackingid: number;

    @Column({nullable:false})
    name: string;

    @Column({type:"time"})
    timestart: string;

    @Column({type:"time"})
    timeend: string;
    
    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}