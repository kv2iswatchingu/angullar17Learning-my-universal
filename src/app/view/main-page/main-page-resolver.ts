import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn, Router} from '@angular/router';
import {EMPTY, forkJoin, of} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import { MainService } from '@/app/service/main.service';
import { EasyAblumInfo } from '@/app/interface/main-interface.interface';
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