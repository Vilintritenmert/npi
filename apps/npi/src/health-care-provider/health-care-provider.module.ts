import { HttpModule, Module } from '@nestjs/common';
import { HealthCareProviderService } from './health-care-provider.service';
import { HealthCareProviderController } from './health-care-provider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Address,
  Basic,
  HealthCareProvider,
  Identifier,
  OtherName, PracticeLocation, Taxonomy,
} from '@app/core';
import { HealthCareProviderRemoteService } from './health-care-provider-remote.service';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      HealthCareProvider, Address, Basic,
      Identifier, OtherName, Taxonomy, PracticeLocation
    ]),
  ],
  providers: [
    HealthCareProviderService,
    HealthCareProviderRemoteService
  ],
  controllers: [
    HealthCareProviderController,
  ],
  exports: [
    TypeOrmModule, HealthCareProviderService,
  ],
})
export class HealthCareProviderModule {}
