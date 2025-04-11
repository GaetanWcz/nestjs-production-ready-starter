import { PrometheusMiddleware } from '@/common/middlewares/prometheus.middleware';
import { RequestIdMiddleware } from '@/common/middlewares/requestId.middleware';
import { silentStream } from '@/common/utils/logger.helper';
import { HealthModule } from '@/modules/health/health.module';
import { MetricsController } from '@/modules/metrics/metrics.controller';
import { UsersModule } from '@/modules/users/users.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    HealthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const isTestEnv = process.env.NODE_ENV === 'test';

        return {
          pinoHttp: {
            level: isTestEnv ? 'silent' : configService.get<string>('LOG_LEVEL', 'info'),
            stream: isTestEnv ? silentStream : undefined,
            transport: !isTestEnv
              ? {
                  target: 'pino-pretty',
                  options: { colorize: true },
                }
              : undefined,
            quietReqLogger: true,
            quietResLogger: true,
          },
        };
      },
      inject: [ConfigService], // Injection de ConfigService
    }),
  ],
  controllers: [MetricsController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PrometheusMiddleware).forRoutes('*');
    consumer.apply(RequestIdMiddleware).forRoutes('*'); // Appliquer à toutes les routes
  }
}
