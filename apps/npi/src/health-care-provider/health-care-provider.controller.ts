import { Controller } from '@nestjs/common';
import { HealthCareProviderService } from './health-care-provider.service';
import { FindProviderDTO } from '@app/core/dto/find-provider.dto';
import { PaginatedHealthCareProviderDto } from '@app/core/dto/paginated-health-care-provider.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('health-care-provider')
export class HealthCareProviderController {
  public constructor (
    private readonly providerService: HealthCareProviderService,
  ) {}

  @MessagePattern('find')
  public async find(requestQuery: FindProviderDTO): Promise<PaginatedHealthCareProviderDto> {
    return await this.providerService.find(requestQuery);
  }

}
