import { HealthCareProvider } from '@app/core';

export class PaginatedHealthCareProviderDto {
  data: HealthCareProvider[];
  page: number;
  limit: number;
  totalCount: number;
}
