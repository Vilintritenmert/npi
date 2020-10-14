import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthCareProviderModule } from './health-care-provider/health-care-provider.module';
import { CityModule } from './city/city.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
        port: +process.env.DB_PORT,
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DB,
        synchronize: false,
        autoLoadEntities: true,
        logging: false,
      },
    ), HealthCareProviderModule,
    CityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
