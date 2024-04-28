import { Routes } from '@angular/router';
import { ShowcaseComponent } from './showcase/showcase.component';
import { MainPageComponent } from './view/main-page/main-page.component';
import { TestComponent } from './view/test/test.component';

export const routes: Routes = [
    {
        path:'test',
        component:TestComponent
    },
    {
        path:'',
        component:MainPageComponent
    },
    {
        path:'showcase',
        component:ShowcaseComponent
    },
];
