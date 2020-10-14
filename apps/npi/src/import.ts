import {AppModule} from './app.module';
import {NestFactory} from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { CityService } from './city/city.service';
import { CityModule } from './city/city.module';
import { HealthCareProviderModule } from './health-care-provider/health-care-provider.module';
import { HealthCareProviderRemoteService } from './health-care-provider/health-care-provider-remote.service';
import { HealthCareProviderService } from './health-care-provider/health-care-provider.service';
import { FindProviderDTO } from '@app/core/dto/find-provider.dto';

async function bootstrap() {
  const logger = new Logger('Import SCRIPT')

  const app = await NestFactory.createApplicationContext(AppModule, {
    logger
  })

  const city = app.select(CityModule).get(CityService)
  const cities = await city.list()
  const remoteHealthCareProvider = app.select(HealthCareProviderModule).get(HealthCareProviderRemoteService)
  const localHealthCareProvider = app.select(HealthCareProviderModule).get(HealthCareProviderService)

  await Promise.all(cities.map(async (city) => {
    try {
      let page = 0;

      while(true) {
        const {result_count:count, results: providers} = await remoteHealthCareProvider.findByCity(city, page)

        await providers.map(async provider => {

          const alreadyHasProvider = await localHealthCareProvider.findOne({
            code: provider.number
          } as FindProviderDTO)

          if (alreadyHasProvider) {
            return
          }

          await localHealthCareProvider.create(provider)
        })

        if (count === 0 || page === 50) {
          break;
        }
        logger.log(`Importing on page #${page}`)

        page++;
      }

    } catch (e) {
      logger.error(e)
    }
  }))

  await app.close()
}

bootstrap();

