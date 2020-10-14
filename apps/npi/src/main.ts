import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

const logger = new Logger('Main');

async function bootstrap () {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.HOST_MICROSERVICE,
      port: process.env.PORT_MICROSERVICE,
    },
  });

  app.listen(() => {logger.log('Microservice started');});

}

bootstrap();
