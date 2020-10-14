import { Module } from '@nestjs/common';
import { MicroserviceHealthCareProviderService } from './microservice-health-care-provider.service';
import { HealthCareProviderController } from './health-care-provider.controller';

@Module({
  imports: [],
  providers: [
    MicroserviceHealthCareProviderService
  ],
  controllers: [
    HealthCareProviderController
  ],
  exports: []
})
export class HttpHealthCareProviderModule {}
