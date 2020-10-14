import {Injectable} from '@nestjs/common';

@Injectable()
export class CityService {
  public list()
  {
    return [
      'Chicago'
    ]
  }

}
