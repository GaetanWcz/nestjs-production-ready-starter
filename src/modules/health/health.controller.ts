import { HealthService } from '@/modules/health/health.service';
import { Controller, Get } from '@nestjs/common';

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
