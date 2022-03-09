import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity({ name: 'user' })
export class UserEntity {

    @ObjectIdColumn()
    id:string;

    @PrimaryColumn()
    accountName:string;

    @Column()
    userName:string;

    @Column()
    winCount:number;

    @Column()
    lostCount:number;

    @Column()
    ratio:number;

}