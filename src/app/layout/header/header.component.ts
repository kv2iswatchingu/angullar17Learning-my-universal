import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [ 
        MatButtonModule, 
        MatRippleModule, 
        MatInputModule,
        MatIconModule,
        MatFormFieldModule,
        FormsModule,
        MatMenuModule
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    searchInput = "";
    
    constructor(private router: Router) {
    }

    homepageFuntion(){
       // console.log("home")
       this.router.navigate(['']);
    }
    searchFuntion(){
        console.log(this.searchInput)
    }
    cdlistFuntion(){
        console.log("cdlist")
        this.router.navigate(['/edit']);
    }
    collectionFuntion(){
        console.log("mycollection")
        this.router.navigate(['/test']);
    }
    loginFuntion(){
        console.log("login")
    }
    registerFuntion(){
        console.log("register")
    }
    localFunction(){
        console.log("local")
    }
}
