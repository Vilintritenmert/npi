import { Injectable } from '@nestjs/common';

import { FindProviderDTO } from '@app/core/dto/find-provider.dto';
import { PaginatedHealthCareProviderDto } from '@app/core/dto/paginated-health-care-provider.dto';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class MicroserviceHealthCareProviderService {

  private client: ClientProxy;

  public constructor () {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.HOST_MICROSERVICE,
        port: +process.env.PORT_MICROSERVICE,
      },
    });
  }

  public async find (query: FindProviderDTO) {
    return this.client.send<PaginatedHealthCareProviderDto, FindProviderDTO>(
      'find', query);
  }

}
