import { CommonModule,Location } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
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

  title = 'My-Angular-Universal';
  showplayer = false;
  
  
  constructor(
    private location:Location,
    private router: Router
  ){

  }

  ngOnInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // 当路由变化结束时（即URL变化完成），执行你想要的操作
        this.showplayer = this.location.path().toString().includes('edit')
      }
    });
  }

 
  


}
