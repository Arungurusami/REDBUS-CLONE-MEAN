import { Component, Input } from '@angular/core';
import { ViewSeats } from '../../view-seats/view-seats';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bottom-tab',
  imports: [ViewSeats, FormsModule, CommonModule],
  templateUrl: './bottom-tab.html',
  styleUrl: './bottom-tab.css'
})
export class BottomTab {
@Input() filledseats:number[]=[]
@Input() seatprice:number=0;
@Input() routedetials:any;
@Input() busarrivaltime: number=0;
@Input() busdeparturetime:number=0;
@Input() operatorname: string=''
@Input() busid:string=''

tabstate:boolean[]=[false,false,false,false,false]

handletabstate(value:number):void{
  for(let i=0;i<this.tabstate.length;i++){
    this.tabstate[i]=(i===value && !this.tabstate[i])
  }
}

}
