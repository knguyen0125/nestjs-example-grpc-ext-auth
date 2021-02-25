import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // External Auth V2 Implementation
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: ['envoy.service.auth.v2'],
      protoPath: [
        join(__dirname, '../vendor/envoy/service/auth/v2/external_auth.proto'),
      ],
      loader: {
        includeDirs: [join(__dirname, '../vendor')],
      },
      url: '0.0.0.0:5000',
    },
  });

  // External Auth V3 Implementation
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.GRPC,
  //   options: {
  //     package: 'envoy.service.auth.v3',
  //     protoPath: join(
  //       __dirname,
  //       '../vendor/envoy/service/auth/v3/external_auth.proto',
  //     ),
  //     loader: {
  //       includeDirs: [join(__dirname, '../vendor')],
  //     },
  //     url: '127.0.0.1:5001',
  //   },
  // });

  await app.startAllMicroservicesAsync();

  await app.listen(3000);
}
bootstrap();
