import { AblumApi, AblumInfo } from '@/app/interface/type.interface';
import { ApiService } from '@/app/service/api.service';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-edit-page',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule,
    FormsModule, 
    MatButtonModule,
    MatIconModule,
    MatSelectModule,  
    ReactiveFormsModule,
  ],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.scss'
})
export class EditPageComponent {
  ablumInfo:AblumInfo = { ablumName:"",ablumBand:"",ablumYear:""}
  ablumCover:File | undefined;
  ablumCoverBase64:string | undefined;
  //defalutImg = "http://dummyimage.com/600x600/000"

  ablumControl = new FormControl<AblumApi | null>(null, Validators.required);
  ablumList:AblumApi[] | undefined;

  constructor(
    private apiservice:ApiService
  ){

  }

  ngOnInit(){
    this.getAllAblum();
  }

 

  //part01
  uploadCover(event:any){
    this.ablumCover = event.target.files[0];
    if(this.ablumCover){
      const reader = new FileReader();
      reader.onload = (e:any) => {
        this.ablumCoverBase64 = e.target.result;
      }
      reader.readAsDataURL(this.ablumCover)
    }
  }
  submitAblumInfo(){
    //console.log(this.ablumInfo)
    if(this.ablumInfo.ablumBand == "" || this.ablumInfo.ablumName == "" || this.ablumInfo.ablumYear == "" || this.ablumCover == undefined){
      console.log("nothing!!!!!")
      return
    }else{
      this.apiservice.postAblum(this.ablumCover,this.ablumInfo).subscribe();
    }

  }



  //part02
  getAllAblum(){
    this.apiservice.getAllAblum().subscribe(res=>{
      this.ablumList = res;
    })
  }
}
