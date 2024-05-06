import { Banner } from '@/app/service/interface/main-interface.interface';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { timer } from 'rxjs/internal/observable/timer';
import { concatMap } from 'rxjs/internal/operators/concatMap';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatIconModule,
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  animations:[
      trigger('carousel', [
      state('show', style({ opacity: 1,display:'block' })),
      state('hide',style({ opacity: 0,display:'none'})),
      transition('hide  => show', [style({ opacity: 0 }), animate(300)]),
      transition('show => hide', animate(300, style({ opacity: 0 })))
    ])
  ]
})
export class CarouselComponent {
  carouselArr = [
    {
      targetId:0,
      name:"ffff",
      imageUrl:"https://raw.githubusercontent.com/kv2iswatchingu/WebSitePicLibrary/main/neko_500.png",
      url:"???????"
    },
    {
      targetId:1,
      name:"ffff22",
      imageUrl:"https://raw.githubusercontent.com/kv2iswatchingu/WebSitePicLibrary/dev/resouce/pic/cover(16).png",
      url:"???????"
    }
  ]
  @Input() bannerData:Banner[] = [];

  currentIndex = 0;
  changeCurrent(index:number){
    this.currentIndex = index;
    console.log(this.currentIndex)
  }
  
  
  //
  /* private readonly delay = 3000;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // 使用Observable来模拟定时器行为
  executePeriodicFunction(): Observable<void> {
    if (isPlatformBrowser(this.platformId)) {
      // 在浏览器环境中，使用标准的setInterval
      return timer(0, this.delay).pipe(
        switchMap(() => this.yourFunctionToExecute())
      );
    } else {
      // 在服务器环境中，使用递归和Promise来模拟定时器
      return this.simulateInterval(0);
    }
  }
  
  private simulateInterval(delay: number): Observable<void> {
    return of(null).pipe(
      switchMap(() => this.yourFunctionToExecute()),
      take(1), // 只执行一次
      concatMap(() => this.simulateInterval(this.delay)) // 递归调用以模拟定时器
    );
  }

  private yourFunctionToExecute(): Observable<void> {
    // 这里放置你想要定期执行的函数逻辑
    console.log('Function executed every 3 seconds');
    return of();
  } */

}
