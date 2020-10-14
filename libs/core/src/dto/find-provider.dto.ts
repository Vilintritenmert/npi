import {IsOptional, IsInt, Min, Max} from 'class-validator'
import { Transform } from 'class-transformer';

export class FindProviderDTO {

  @IsOptional()
  name: string;

  @IsOptional()
  code: string;

  @Transform( page => parseInt(page))
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number;

  @Transform( limit => parseInt(limit))
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(200)
  limit: number;
}
