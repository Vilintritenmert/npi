import { Module } from '@nestjs/common';
import { HttpHealthCareProviderModule } from './health-care-provider/http-health-care-provider.module';

@Module({
  imports: [HttpHealthCareProviderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
