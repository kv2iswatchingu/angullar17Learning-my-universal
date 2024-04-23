import { Component } from '@angular/core';
import { CdlistComponent } from "../cdlist/cdlist.component";

@Component({
    selector: 'app-user',
    standalone: true,
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss',
    imports: [CdlistComponent]
})
export class UserComponent {
  userName = 'shimakaze';
  isLogin = false;
  favcd = '';

  getFavCd(cdName:string){
    this.favcd = cdName;
    alert("add"+ cdName + "to your fav")
  }
}
