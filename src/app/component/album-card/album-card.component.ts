import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-album-card',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatIconModule,
  ],
  templateUrl: './album-card.component.html',
  styleUrl: './album-card.component.scss'
})
export class AlbumCardComponent {
  @Input() ablumEasyInfoImg = "";
  @Input() ablumEasyInfoView = "";
  @Input() ablumEasyInfoId = "";
  @Input() ablumEasyInfoTitle = "";

}
