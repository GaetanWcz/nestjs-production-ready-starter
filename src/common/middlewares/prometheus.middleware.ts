import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Counter } from 'prom-client';

@Injectable()
export class PrometheusMiddleware implements NestMiddleware {
  private readonly requestCounter: Counter<string>;

  constructor() {
    this.requestCounter = new Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status'],
    });
  }

  use(req: Request, res: Response, next: () => void): void {
    res.on('finish', () => {
      this.requestCounter.inc({
        method: req.method,
        route: req.url,
        status: res.statusCode,
      });
    });

    next();
  }
}
