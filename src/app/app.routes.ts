import { Routes } from '@angular/router';
import { MainPageComponent } from './view/main-page/main-page.component';
import { TestComponent } from './view/test/test.component';
import { CdPlayerCustomPageComponent } from './view/cd-player-custom-page/cd-player-custom-page.component';
import { EditPageComponent } from './view/edit-page/edit-page.component';

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
        path:'local',
        component:CdPlayerCustomPageComponent
    },
    {
        path:'edit',
        component:EditPageComponent
    },
];
