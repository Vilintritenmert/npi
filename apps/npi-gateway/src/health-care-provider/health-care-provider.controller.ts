import { Controller, Query, Get, Logger } from '@nestjs/common';
import { MicroserviceHealthCareProviderService } from './microservice-health-care-provider.service';
import { FindProviderDTO } from '@app/core/dto/find-provider.dto';

@Controller('health-care-provider')
export class HealthCareProviderController {
  private logger: Logger;

  public constructor (
    private readonly providerService: MicroserviceHealthCareProviderService,
  ) {
    this.logger = new Logger('HealthCareProviderController');
  }

  @Get()
  public async find (@Query() requestQuery: FindProviderDTO) {
    return await this.providerService.find(requestQuery);
  }

}
