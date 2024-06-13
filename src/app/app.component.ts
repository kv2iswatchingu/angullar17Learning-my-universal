import { CommonModule,Location } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
      HeaderComponent,
      AudioPlayerComponent
    ]

})
export class AppComponent {
  constructor(
    private location:Location
  ){

  }

  title = 'My-Angular-Universal';
  showplayer = this.location.path().toString().includes('edit')
  
  


}
