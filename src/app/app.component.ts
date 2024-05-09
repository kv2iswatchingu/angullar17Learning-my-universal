import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterPlayerComponent } from './component/footer-player/footer-player.component';



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
      CommonModule, 
      RouterOutlet, 
      UserComponent,
      HeaderComponent,
      FooterPlayerComponent
    ]

})
export class AppComponent {
  title = 'My-Angular-Universal';
}
