import { Component } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [HeaderComponent, MatButtonModule, MatRippleModule,NgOptimizedImage],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  bound = false;
  test = "https://raw.githubusercontent.com/kv2iswatchingu/WebSitePicLibrary/main/neko_500.png"
  audio = "https://github.com/kv2iswatchingu/WebSitePicLibrary/raw/dev/resouce/music/%E6%98%9F%E3%81%AE%E8%A8%98%E6%86%B6%E3%81%AB%E5%88%BB%E3%81%BE%E3%82%8C%E3%81%97%E9%BB%92%E7%B4%AB%E3%81%AE%E7%BF%BC.mp3"
  audio2 = "https://github.com/kv2iswatchingu/WebSitePicLibrary/raw/dev/resouce/music/harukage.mp3"
}
