import { Component, OnInit } from '@angular/core';
import { BusService } from '../../service/bus.service';
import { Booking } from '../../model/booking.model';
import { MyTrip } from './my-trip/my-trip';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile-page',
  imports: [MyTrip, CommonModule, MatIconModule],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css'
})
export class ProfilePage implements OnInit{
  selecteditem:string='trips';
  currentcustomer:any=[]
  currentname:string=''
  currentemail:string=''
  mytrip:Booking[]=[]
  handlelistitemclick(selected:string):void{
    this.selecteditem=selected
  }
  constructor(private busbooking:BusService){}
  ngOnInit(): void {
    this.currentcustomer=sessionStorage.getItem('Loggedinuser')
    const user=JSON.parse(this.currentcustomer)
    this.currentname=user.name;
    this.currentemail=user.email;
    this.busbooking.getbusmongo(user._id).subscribe((response:any)=>{
      this.mytrip=response
      console.log(this.mytrip)
    })
  }
}
