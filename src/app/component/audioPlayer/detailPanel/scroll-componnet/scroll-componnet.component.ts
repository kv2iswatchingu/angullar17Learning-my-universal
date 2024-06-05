import { Component, ElementRef, Input,SimpleChanges, ViewChild } from '@angular/core';
import BScroll from '@better-scroll/core';
import { timer } from 'rxjs';




@Component({
  standalone:true,
  selector: 'app-scroll',
  imports:[

  ],
  templateUrl: './scroll-componnet.component.html',
  styleUrls: ['./scroll-componnet.component.scss']
})
export class ScrollComponnetComponent {
  @Input() data:any[] = [];
  private bs!: BScroll | undefined;
  @ViewChild('wrap',{static:true}) private wrapRef!:ElementRef;


  constructor(readonly el:ElementRef){

  }
  ngAfterViewInit(){
    if(typeof window !== 'undefined'){

    
      this.bs = new BScroll(this.wrapRef.nativeElement)
      //this.bs.on('scrollEnd',({y}) = this.onScrollEnd.emit(y))
    }
  }
  ngOnChanges(changes:SimpleChanges){
    if(changes['data']){
      this.refreshScroll();
    }
  }


  refreshScroll(){
    console.log("refresh")
    
    timer(80).subscribe(()=>{
      this.bs?.refresh();
      //console.log("refresh50")
    })
  }

  /* scrollTo(dom:HTMLElement,time:number,x:number,y:number){
    //this.bs?.refresh()
      this.bs?.scrollToElement(dom,time,x,y)
    
  } */
  scrollTo(...args:any){
    this.bs?.scrollToElement.apply(this.bs, args)
  }
  scrollToElement(...args:any){
    this.bs?.scrollToElement.apply(this.bs, args)
  }
}
