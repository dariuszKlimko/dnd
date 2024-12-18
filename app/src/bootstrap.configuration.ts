import { Reflector } from "@nestjs/core";
import { BadRequestException, ClassSerializerInterceptor, INestApplication, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { HttpExceptionFilter } from "@app/common/filter/http.exception.filter";
import { ConfigService } from "@nestjs/config";
import { dataBaseConfig } from "@app/data.source";
import { DataSourceOptions } from "typeorm";
import { ThrottlerModuleOptions } from "@nestjs/throttler";

export function configureSwagger(app: INestApplication): void {
  const config = new DocumentBuilder().setTitle("DND API").setDescription("DND API").setVersion("1.0").build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api", app, document);
}

export function configureValidator(app: INestApplication): void {
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (validationErrors) =>
        new BadRequestException({
          type: "validation error",
          data: validationErrors,
          message: "data validation error",
        }),
    })
  );
}

export function configureHttpExceptionFilters(app: INestApplication): void {
  app.useGlobalFilters(new HttpExceptionFilter());
}

export function configureThrotllerModule(configService: ConfigService): ThrottlerModuleOptions {
  return [
    {
      ttl: configService.get<number>("THROTTLE_TTL"),
      limit: configService.get<number>("THROTTLE_LIMIT"),
    },
  ];
}

export function configureTypeORMModule(configService: ConfigService): DataSourceOptions {
  return dataBaseConfig(configService.get<string>("NODE_ENV"));
}

export function configureCacheModule(configService: ConfigService): { ttl: number; max: number } {
  return {
    ttl: configService.get<number>("CACHE_TTL"),
    max: configService.get<number>("CACHE_MAX_ITEMS"),
  };
}
