import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('NestJS Production Ready Starter')  // Titre de l'API
    .setDescription('API documentation for the production-ready NestJS starter')  // Description de l'API
    .setVersion('1.0')  // Version de l'API
    .addTag('users')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);  // L'API Swagger sera accessible à /api

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
