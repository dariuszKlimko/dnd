import { NestFactory } from "@nestjs/core";
import { AppModule } from "@app/app.module";
import { configureHttpExceptionFilters, configureSwagger, configureValidator } from "@app/bootstrap.configuration";
import { ConfigService } from "@nestjs/config";
import { INestApplication, Logger } from "@nestjs/common";

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>("PORT");
  const docker_port: number = config.get<number>("DOCKER_PORT");

  configureSwagger(app);
  configureValidator(app);
  configureHttpExceptionFilters(app);

  await app.listen(port, () => Logger.log(`App listening on port ${port} or docker on ${docker_port}`));
}
bootstrap();
// yarn migration:generate ./src/migrations/name
