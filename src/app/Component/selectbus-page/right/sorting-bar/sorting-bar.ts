import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sorting-bar',
  imports: [MatDividerModule, MatIconModule, ],
  templateUrl: './sorting-bar.html',
  styleUrl: './sorting-bar.css',
})
export class SortingBar {

}
