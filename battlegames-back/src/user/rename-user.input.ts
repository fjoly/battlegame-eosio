import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";

@InputType()
export class RenameUserInput {

    @Field()
    @MinLength(1)
    accountName:string;

    @Field()
    @MinLength(1)
    userName:string;
}