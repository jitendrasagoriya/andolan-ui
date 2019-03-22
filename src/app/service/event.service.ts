import { ConfigurationService } from './configuration.service';
import { catchError, tap } from 'rxjs/operators';
import { Event } from './../model/event';
import { HandleError, HttpErrorHandler } from './../http-error-handler.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { MessageService } from '../message.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class EventService {


  eventUrl = 'event/';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    configurationService: ConfigurationService,
    private messageService: MessageService) {
    this.handleError = httpErrorHandler.createHandleError('EventService');
    this.eventUrl = configurationService.getBaseUrl() + this.eventUrl;
  }

  /** GET heroes from the server */
  getEvents (): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventUrl)
      .pipe(
        catchError(this.handleError('getEvents', []))
      );
  }

  /* GET heroes whose name contains search term */
  searchEvents(term: string): Observable<Event[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
     { params: new HttpParams().set('name', term) } : {};

    return this.http.get<Event[]>( this.eventUrl + 'search', options)
      .pipe(
        catchError(this.handleError<Event[]>('searchEvents', []))
      );
  }

  /** POST: add a new hero to the database */
  addEvent (event: Event) {
    return this.http.post ( this.eventUrl, event, httpOptions).pipe(
      tap((newHero: Event) => this.log(`added event w/ id=${newHero.eventId}`)),
      catchError(this.handleError<Event>('addHero')));
  }
  /** Log a EventService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`EventService: ${message}`);
  }

  /** DELETE: delete the hero from the server */
  deleteEvent (id: number): Observable<{}> {
    const url = `${this.eventUrl}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteEvent'))
      );
  }

  /** PUT: update the hero on the server. Returns the updated hero upon success. */
  updateEvent (event: Event): Observable<Event> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<Event>(this.eventUrl, event, httpOptions)
      .pipe(
        catchError(this.handleError('updateEvent', event))
      );
  }

}
