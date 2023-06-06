import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    // .addBearerAuth()
    .setTitle('Fincra Customer Support Ticketing System')
    .setDescription('Fincra Customer Support Ticketing System API Documentation')
    .setVersion('1.0')
    // .addTag('fincra, customer ticketing system')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
