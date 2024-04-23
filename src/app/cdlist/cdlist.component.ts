import { Component, Input, Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-cdlist',
  standalone: true,
  imports: [],
  templateUrl: './cdlist.component.html',
  styleUrl: './cdlist.component.scss'
})
export class CdlistComponent {
  @Input() username = '';
  @Output() addFavAblum = new EventEmitter<string>();

  favCd(cdName:string){
    this.addFavAblum.emit(cdName);
  }
  
  ablumList = [
    {
      id:1,
      name:'No1'
    },
    {
      id:2,
      name:'No2'
    },
    {
      id:3,
      name:'No3'
    }
  ]

 
}
