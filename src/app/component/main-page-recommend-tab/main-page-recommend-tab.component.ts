import { CategoryInfo } from '@/app/interface/main-interface.interface';
import { Component, Input} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-main-page-recommend-tab',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatIconModule,
  ],
  templateUrl: './main-page-recommend-tab.component.html',
  styleUrl: './main-page-recommend-tab.component.scss'
})
export class MainPageRecommendTabComponent {
  @Input() recommendTitle = "";
  @Input() recommendCategory:CategoryInfo[] = [];
  @Input() showMore:boolean = true;

  gotoCategory(index:number,item:string){
    console.log(index)
    console.log(item)
  }
  gotoMore(){
    console.log("more!!!!@")
  }
}
