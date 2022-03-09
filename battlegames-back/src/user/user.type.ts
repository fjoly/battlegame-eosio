import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType('Game')
export class UserType {

    @Field(type => ID)
    id: string;

    @Field()
    accountName:string;

    @Field()
    userName:string;

    @Field()
    winCount:number;

    @Field()
    lostCount:number;

    @Field()
    ratio:number;
}