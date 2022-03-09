import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity
        ]),
        ConfigModule
    ],
    providers: [UserService,UserResolver,ConfigService]
})
export class UserModule {}
