import { Module } from '@nestjs/common';
import { AppController } from './modules/app/app.controller';
import { AppService } from './modules/app/app.service';
import { ConfigModule } from '@nestjs/config';
import { configuration } from 'src/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true, // config accessible globalement
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService
  ]
})
export class AppModule {}
