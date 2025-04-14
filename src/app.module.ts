import { PrometheusMiddleware } from '@/common/middlewares/prometheus.middleware';
import { RequestIdMiddleware } from '@/common/middlewares/requestId.middleware';
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
        return {
          pinoHttp: {
            level: configService.get<string>('LOG_LEVEL', 'info'),
            transport: {
              target: 'pino-pretty',
              options: { colorize: true },
            },
            quietReqLogger: true,
            quietResLogger: true,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [MetricsController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PrometheusMiddleware).forRoutes('*');
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
