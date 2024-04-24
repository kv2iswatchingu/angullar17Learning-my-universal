import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ MatButtonModule,MatRippleModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  mycolor = "#abc"
}
