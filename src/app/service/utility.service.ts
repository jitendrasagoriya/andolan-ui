import { Status } from './../model/status';
import { Gender } from './../model/gender';
import { ConfigurationService } from './configuration.service';
import { HttpErrorHandler, HandleError } from './../http-error-handler.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { EventType } from '../model/eventtype';
import { catchError } from 'rxjs/operators';
import { ParticitantType } from '../model/particitantType';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class UtilityService {

  private handleError: HandleError;

  constructor(private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private configurationService: ConfigurationService) {
      this.handleError = httpErrorHandler.createHandleError('UtilityService');
    }

    getEventType(): Observable<EventType[]> {
      console.log(this.configurationService.getUtilityUrl() + 'eventtype');
      return this.http.get<EventType[]>(this.configurationService.getUtilityUrl() + 'eventtype')
        .pipe(
          catchError(this.handleError('getEventType', []))
        );
    }

    getGender(): Observable<Gender[]> {
      return this.http.get<Gender[]>(this.configurationService.getUtilityUrl() + 'gender')
        .pipe(
          catchError(this.handleError('getGender', []))
        );
    }

    getStatus(): Observable<Status[]> {
      return this.http.get<Status[]>(this.configurationService.getUtilityUrl() + 'status')
        .pipe(
          catchError(this.handleError('getStatus', []))
        );
    }

    getParticitantType(): Observable<ParticitantType[]> {
      return this.http.get<ParticitantType[]>(this.configurationService.getUtilityUrl() + 'participanttype')
        .pipe(
          catchError(this.handleError('getParticitantType', []))
        );
    }
}
