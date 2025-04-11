import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import request from 'supertest';
import { MockMetricsController } from './mocks/metrics.controller.mock';
import { MockLoggerModule } from './mocks/logger.module.mock';
import { LoggerModule } from 'nestjs-pino';

describe('Health Controller Integration Tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider('MetricsController')
      .useClass(MockMetricsController)
      .overrideModule(LoggerModule)
      .useModule(MockLoggerModule)
      .compile();

    app = module.createNestApplication();

    app.enableShutdownHooks();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  it('Should return health status when calling liveness.', async () => {
    await request(app.getHttpServer()).get('/health/liveness').expect(HttpStatus.OK, {
      status: 'ok',
      info: {},
      error: {},
      details: {},
    });
  });
});
