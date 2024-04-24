import { Routes } from '@angular/router';
import { ShowcaseComponent } from './showcase/showcase.component';
import { MainPageComponent } from './view/main-page/main-page.component';

export const routes: Routes = [
    {
        path:'',
        component:MainPageComponent
    },
    {
        path:'showcase',
        component:ShowcaseComponent
    },
];
