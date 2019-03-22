import { EventService } from './service/event.service';
import { PageNoFoundComponent } from './component/page-no-found/page-no-found.component';
import { UtilityService } from './service/utility.service';
import { ExceptionService } from './service/exception.service';
import { ConfigurationService } from './service/configuration.service';
import { httpInterceptorProviders } from './http-interceptors/index';
import { MessageService } from './message.service';
import { HttpErrorHandler } from './http-error-handler.service';
import { CountryService } from './service/country.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { HomeComponent } from './component/home/home.component';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { RequestCache, RequestCacheWithMap } from './request-cache.service';
import { ContactUsComponent } from './component/contact-us/contact-us.component';



const appRoutes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contactus', component: ContactUsComponent },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNoFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    HomeComponent,
    PageNoFoundComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    CountryService,
    EventService,
    HttpErrorHandler,
    MessageService,
    ExceptionService,
    ConfigurationService,
    UtilityService,
    httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
