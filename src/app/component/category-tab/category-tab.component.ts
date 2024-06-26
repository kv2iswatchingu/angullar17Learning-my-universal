import { CategoryInfo } from '@/app/interface/main-interface.interface';
import { ApiService } from '@/app/service/api.service';
import { Component, Input} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'category-tab',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatIconModule,
  ],
  templateUrl: './category-tab.component.html',
  styleUrl: './category-tab.component.scss'
})
export class  CategoryTabComponent {
  @Input() recommendTitle = "";
  @Input() category:string[] = [];
  @Input() showMore:boolean = true;

  constructor(
    private router: Router,
    
  ){

  }

  

  gotoCategory(index:number,item:string){
    console.log(index)
    console.log(item)
    this.router.navigate(['/list'],{queryParams:{styles:item}});


  }
  gotoMore(){
    console.log("more!!!!@")
    this.router.navigate(['/list']);
  }

 
}
