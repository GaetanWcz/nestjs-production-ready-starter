import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/modules/user/users.module';
import { LoggerModule } from 'nestjs-pino';
import { RequestIdMiddleware } from 'src/common/middlewares/requestId.middleware';
import { HealthModule } from 'src/modules/health/health.module';

@Module({
  imports: [
    HealthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        pinoHttp: {
          level: configService.get<string>('LOG_LEVEL', 'info'),
          transport: {
            target: 'pino-pretty',
            options: { colorize: true },
          },
        },
      }),
      inject: [ConfigService], // Injection de ConfigService
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*'); // Appliquer à toutes les routes
  }
}
