import { HealthService } from '@/modules/health/health.service';
import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('readiness')
  async readiness() {
    return this.healthService.readinessCheck();
  }

  @Get('liveness')
  async liveness() {
    return this.healthService.livenessCheck();
  }
}
