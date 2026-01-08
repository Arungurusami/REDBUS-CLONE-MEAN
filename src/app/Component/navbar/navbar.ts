// import { Component, OnInit } from '@angular/core';
// declare var google:any;
// import { CustomerService } from '../../service/customer.service';
// import { Customer } from '../../model/customer.model';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatMenuModule } from '@angular/material/menu';
// @Component({
//   selector: 'app-navbar',
//   imports: [CommonModule, FormsModule, MatMenuModule,],
//   templateUrl: './navbar.html',
//   styleUrl: './navbar.css'
// })
// export class Navbar implements OnInit{
// constructor(private router:Router,private customerservice:CustomerService){}
// isloggedIn:boolean=false
// ngOnInit(): void {
//   if(sessionStorage.getItem("Loggedinuser")){
//     this.isloggedIn=true
//   }else{
//     this.isloggedIn=false
//   }


//   google.accounts.id.initialize({
//     client_id:"933930620758-7qhfcade8muscdcdn947jvdmtpodo5hs.apps.googleusercontent.com",
//     callback:(response:any)=>{this.handlelogin(response);

//     }
//   })
// }
// ngAfterViewInit():void{
//   this.rendergooglebutton();
// }
// private rendergooglebutton():void{
//   const googlebtn=document.getElementById('google-btn');
//   if(googlebtn){
//     google.accounts.id.renderButton(googlebtn,{
//       theme:'outline',
//       size:'medium',
//       shape:'pill',
//       width:150,
//     })
//   }
// }

// private decodetoken(token:String){
//   return JSON.parse(atob(token.split(".")[1]))
// }
// handlelogin(response:any){
//   const payload=this.decodetoken(response.credential)
//   // console.log(payload)
//   this.customerservice.addcustomermongo(payload).subscribe({
//     next:(response)=>{
//       console.log('POST success',response);
//       sessionStorage.setItem("Loggedinuser",JSON.stringify(response))
//     },
//     error:(error)=>{
//       console.error('Posr request failed',error)
//     }
//   })
// }
// handlelogout(){
//   google.accounts.id.disableAutoSelect();
//   sessionStorage.removeItem('Loggedinuser');
//   window.location.reload()
// }
// navigate(route:string){
//   this.router.navigate([route])
// }
// }

import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { CustomerService } from '../../service/customer.service';
import { Customer } from '../../model/customer.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';

declare var google: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, MatMenuModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  isloggedIn: boolean = false;

  constructor(
    private router: Router,
    private customerservice: CustomerService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {

    // ✅ sessionStorage ONLY in browser
    if (isPlatformBrowser(this.platformId)) {

      if (sessionStorage.getItem("Loggedinuser")) {
        this.isloggedIn = true;
      } else {
        this.isloggedIn = false;
      }

      // ✅ Google login ONLY in browser
      google.accounts.id.initialize({
        client_id: "933930620758-7qhfcade8muscdcdn947jvdmtpodo5hs.apps.googleusercontent.com",
        callback: (response: any) => {
          this.handlelogin(response);
        }
      });
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.rendergooglebutton();
    }
  }

  private rendergooglebutton(): void {
    const googlebtn = document.getElementById('google-btn');
    if (googlebtn) {
      google.accounts.id.renderButton(googlebtn, {
        theme: 'outline',
        size: 'medium',
        shape: 'pill',
        width: 150,
      });
    }
  }

  private decodetoken(token: string) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  handlelogin(response: any) {
    const payload = this.decodetoken(response.credential);

    this.customerservice.addcustomermongo(payload).subscribe({
      next: (response) => {
        console.log('POST success', response);

        if (isPlatformBrowser(this.platformId)) {
          sessionStorage.setItem("Loggedinuser", JSON.stringify(response));
        }
      },
      error: (error) => {
        console.error('POST request failed', error);
      }
    });
  }

  handlelogout() {
    if (isPlatformBrowser(this.platformId)) {
      google.accounts.id.disableAutoSelect();
      sessionStorage.removeItem('Loggedinuser');
      window.location.reload();
    }
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
