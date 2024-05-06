import { MusicInfo } from '@/app/service/interface/main-interface.interface';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-easypalyerlist',
  standalone: true,
  imports: [
    
  ],
  templateUrl: './easypalyerlist.component.html',
  styleUrl: './easypalyerlist.component.scss'
})
export class EasypalyerlistComponent {
  
  @Input() latestMusicList: MusicInfo[] = []


}
