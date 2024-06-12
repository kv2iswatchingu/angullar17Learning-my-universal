import {inject} from '@angular/core';
import {ResolveFn, Router} from '@angular/router';
import {forkJoin} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import { MainService } from '@/app/service/main.service';
//route: ActivatedRouteSnapshot
export const mainPageResolver: ResolveFn<any> = () => {
  const router = inject(Router);

  const mainService = inject(MainService);

  //const id = route.paramMap.get('id')!;

  return forkJoin([
      mainService.getMainPageAblumList(),
      mainService.getMainPageBanners()
    ]).pipe(mergeMap(res=>{
      return res;
    }))



  
};