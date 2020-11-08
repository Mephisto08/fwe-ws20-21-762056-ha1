import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class Tracking{
    @PrimaryGeneratedColumn()
    trackingid: number;

    @Column()
    name: string;

    @Column({type:"time", nullable:true})
    timestart: string;

    @Column({type:"time", nullable:true})
    timeend: string;
    
    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}