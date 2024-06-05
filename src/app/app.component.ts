import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './layout/header/header.component';
import { AudioPlayerComponent } from '@/app/component/audioPlayer/player.component';



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
      AudioPlayerComponent
    ]

})
export class AppComponent {
  title = 'My-Angular-Universal';
}
