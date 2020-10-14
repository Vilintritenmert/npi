import { HttpService, Injectable } from '@nestjs/common';
import { catchError, map, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class HealthCareProviderRemoteService {

  private limitPerPage = 50;
  private apiUrl = 'https://npiregistry.cms.hhs.gov/api/';

  constructor (
    private readonly  httpService: HttpService,
  ) {}

  private static prepareCityName(city:string) {
    return city.replace(' ', '+')
  }

  private getRequest(url: string): Promise<any> {
    return this.httpService.get(url)
      .pipe(
        map(response => response.data),
        catchError(error => {
          return throwError(error);
        }),
        retry(3)
      ).toPromise()
  }

  private prepareUri(city: string, page: number) {
    const skip = page * this.limitPerPage

    return `${this.apiUrl}?city=${HealthCareProviderRemoteService.prepareCityName(city)}&limit=${this.limitPerPage}&skip${skip}=&&version=2.1`;
  }

  async findByCity (city: string, page: number) {
    const url = this.prepareUri(city, page)
    return  await this.getRequest(url);
  }

}
