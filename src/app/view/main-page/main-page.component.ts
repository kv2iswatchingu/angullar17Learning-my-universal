import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { NgOptimizedImage } from '@angular/common'
import { MainService } from '@/app/service/main-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CarouselComponent } from '@/app/component/carousel/carousel.component';
import { AlbumListComponent } from '@/app/component/album-list/album-list.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    HeaderComponent, 
    MatButtonModule, 
    MatRippleModule,
    NgOptimizedImage,
    HttpClientModule,
    CarouselComponent,
    AlbumListComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit{
  
  isLoading = false;

  constructor(
    private mainService: MainService
  ){
   
  }
  ngOnInit(): void {
      this.getBanner();
  }
  getBanner(){
    this.mainService.getMainPageBanners().subscribe(res => {
      console.log(res);
    })
  }
}
