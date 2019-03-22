import { ExceptionService } from './exception.service';
import { ConfigurationService } from './configuration.service';
import { District } from './../model/District';
import { City } from './../model/city';
import { State } from './../model/state';
import { HttpErrorHandler, HandleError } from './../http-error-handler.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class CountryService {

  stateUrl = 'state/';
  cityByStateUrl = 'city/state';
  districtByStateUrl = 'district/state';
  private handleError: HandleError;

  constructor(private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private configurationService: ConfigurationService,
    private exceptionService: ExceptionService) {
      this.handleError = httpErrorHandler.createHandleError('CountryService');
      this.stateUrl = this.configurationService.getCountryInfoUrl() +  this.stateUrl;
      this.cityByStateUrl = this.configurationService.getCountryInfoUrl()
       +  this.cityByStateUrl;
      this.districtByStateUrl = this.configurationService.getCountryInfoUrl()
       +  this.districtByStateUrl;

    }


    getStatesOld(): Observable<State[]> {
      // get users from api
      return this.http.get(this.stateUrl, httpOptions)
          .map((response: Response) => response.json())
          .catch((response: Response) => Observable.throw(
            this.exceptionService.errorHandlerWithPage(response, 'registration')
          ));
    }
    getStates(): Observable<State[]> {
      return this.http.get<State[]>(this.stateUrl)
        .pipe(
          catchError(this.handleError('getStates', []))
        );
    }

    getCityByState(id: string): Observable<City[]> {
      const url = `${this.cityByStateUrl}/${id}`;
      return this.http.get<City[]>(url)
        .pipe(
          catchError(this.handleError('getCityByState', []))
        );
    }

    getCityByDistrict(id: string): Observable<District[]> {
      const url = `${this.districtByStateUrl}/${id}`;
      console.log('url: ' + url);
      return this.http.get<District[]>(url)
        .pipe(
          catchError(this.handleError('getCityByDistrict', []))
        );
    }
}
