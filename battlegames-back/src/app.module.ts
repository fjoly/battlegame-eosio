import { Module } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "./user/user.module";
import {UserEntity} from "./user/user.entity";
import {ScheduleModule} from "@nestjs/schedule";
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import 'dotenv/config';

const host = process.env.DATABASE_HOST || 'localhost';

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mongodb',
          url: `mongodb://${host}/user`,
          synchronize:true,
          useUnifiedTopology : true,
          entities: [UserEntity]
      }),
      GraphQLModule.forRoot<ApolloDriverConfig>({
            autoSchemaFile: true,
            driver: ApolloDriver,
      }),
      ScheduleModule.forRoot(),
      ConfigModule.forRoot({
          isGlobal: true,
      }),
      UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
