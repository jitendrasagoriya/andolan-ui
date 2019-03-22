import { ParticitantType } from './../../model/particitantType';
import { District } from './../../model/District';
import { City } from './../../model/city';
import { EventType } from './../../model/eventtype';
import { UtilityService } from './../../service/utility.service';
import { State } from './../../model/state';
import { Event } from './../../model/event';
import { CountryService } from './../../service/country.service';
import { Component, OnInit } from '@angular/core';
import { EventService } from '../../service/event.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  providers: [ CountryService , UtilityService ],
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public states: State[];
  public eventTypes: EventType[];
  public cities: City[];
  public districts: District[];
  public particitantTypes: ParticitantType[];

  event = new Event();

  public errorMessage: string;
  public show_dialog = false;

  constructor(private countryService: CountryService,
    private utilityService: UtilityService,
    private eventService: EventService ) {

    // get list of state
    this.countryService.getStates().subscribe(states => {
       this.states = states;
    });
    // get list of eventtype
    this.utilityService.getEventType().subscribe(eventTypes => {
      this.eventTypes = eventTypes;
    });

    // get list of eventtype
    this.utilityService.getParticitantType().subscribe(particitantType => {
      this.particitantTypes = particitantType;
    });
  }

  loadCityAndDistrict(stateName: string) {
    this.loadCity(stateName);
    this.loadDistrict(stateName);
  }

  loadCity(stateName: string) {
    this.countryService.getCityByState(stateName).subscribe(cities => {
      this.cities = cities;
   });
  }

  loadDistrict(stateName: string) {
    this.countryService.getCityByDistrict(stateName).subscribe(districts => {
      this.districts = districts;
   });
  }

  ngOnInit() {
  }

  onSubmit() {
    if ( this.event.password !== this.event.confirmPassword) {
        this.errorMessage = 'Password does not match';
        this.show_dialog = true;
    } else {
        this.eventService.addEvent(this.event).subscribe((res) => {
          console.log(res);
         });
    }
  }
}

