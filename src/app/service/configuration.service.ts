import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationService {

  public countryInfoUrl = 'http://api-data-india.herokuapp.com/api/v1/';
  public baseProdUrl = 'https://andolan-backend.herokuapp.com/api/';
  public baseDevUrl = 'http://localhost:8090/api/';

  public isProd = true;
  constructor() { }

  public getCountryInfoUrl() {
    return this.countryInfoUrl;
  }

  public getBaseUrl(): string {
    if ( this.isProd ) {
      return this.baseProdUrl;
    } else {
      return this.baseDevUrl;
    }
  }

  public getUtilityUrl(): string {
    return this.getBaseUrl() + 'utility/';
  }

}
