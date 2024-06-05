import { Pipe,PipeTransform } from "@angular/core";

@Pipe({
    name:'playerTimeFormat',
    standalone:true
})
export class playerTimeFormat implements PipeTransform {
    transform(time:number | undefined):string{
        if(time != undefined){
            const temp = time | 0;
            const mins = temp / 60 | 0;
            const second = (temp % 60).toString().padStart(2,'0');
            return `${mins}:${second}`;
        }
        else{
            return "00:00"
        }
    }
}