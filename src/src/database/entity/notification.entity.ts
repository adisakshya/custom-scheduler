import {UserItemEntity} from "./base.entity";
import {Column, CreateDateColumn, Entity} from "typeorm";

@Entity()
export class Notification extends UserItemEntity {
    @CreateDateColumn()
    deliverAt: Date;

    @Column({nullable: false})
    itemType: string;

    @Column({nullable: false})
    itemId: string;

    @Column({nullable: false})
    notificationData: string;
}
