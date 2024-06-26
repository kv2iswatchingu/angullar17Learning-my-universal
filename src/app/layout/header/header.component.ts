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
    searchInput:string = "";
    
    constructor(private router: Router) {
    }

    homepageFuntion(){
       this.router.navigate(['']);
    }
    searchFuntion(){
        console.log(this.searchInput)
        this.router.navigate(['/search']);
    }
    cdlistFuntion(){
        this.router.navigate(['/edit']);
    }
    collectionFuntion(){
        this.router.navigate(['/test']);
    }
    loginFuntion(){
        console.log("login")
    }
    registerFuntion(){
        console.log("register")
    }
    localFunction(){
        this.router.navigate(['/local']);
    }
}
