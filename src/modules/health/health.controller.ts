import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  // Endpoint de readiness
  @Get('readiness')
  async readiness() {
    return this.healthService.readinessCheck();
  }

  // Endpoint de liveness
  @Get('liveness')
  async liveness() {
    return this.healthService.livenessCheck();
  }
}
