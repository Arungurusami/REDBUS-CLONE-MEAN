import { Component, Input } from '@angular/core';
import { BusBookingForm } from '../bus-booking-form/bus-booking-form';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';

@Component({
  selector: 'app-form-drawer',
  imports: [BusBookingForm, MatDrawer, MatDrawerContainer],
  templateUrl: './form-drawer.html',
  styleUrl: './form-drawer.css'
})
export class FormDrawer {
  @Input() selectedseat:number[]=[]
  @Input() seatprice:number=0;
  @Input() routedetails: any;
  @Input() busid:string=''
  @Input() busarrivaltime: number =0;
  @Input() busdeparturetime:number=0;
  @Input() operatorname:string=''
  formdrawerstate:boolean=false;
  sidenavopened=false;

  toogledrawer(open:boolean):void{
    this.formdrawerstate=open
  }
}
