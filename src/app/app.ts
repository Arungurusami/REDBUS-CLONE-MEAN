import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './Component/navbar/navbar';
import { Footer } from './Component/footer/footer';
import { ProfilePage } from './Component/profile-page/profile-page';
import { SelectbusPage } from './Component/selectbus-page/selectbus-page';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Navbar,
    Footer,
    ProfilePage,
    SelectbusPage
  ],
  templateUrl: './app.html'
})
export class AppComponent {}
