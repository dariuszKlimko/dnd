import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppConfigModule } from "@app/config.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RestLogger } from "@app/common/loggers/rest.logger.middleware";
import {
  configureThrotllerModule,
  configureTypeORMModule,
} from "@app/bootstrap.configuration";

import { default as Entities } from "@app/entities";
import { default as Repositories } from "@app/repositories";
import { default as Services } from "@app/services";
import { default as Controllers } from "@app/controllers";
import { ThrottlerModule } from "@nestjs/throttler";

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: configureThrotllerModule,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: configureTypeORMModule,
    }),
    TypeOrmModule.forFeature([...Entities]),
    AppConfigModule,
  ],
  controllers: [...Controllers],
  providers: [...Services, ...Repositories],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RestLogger).forRoutes("*");
  }
}
