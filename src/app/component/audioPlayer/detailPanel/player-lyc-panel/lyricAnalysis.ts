import { LyricAnalysised } from "@/app/interface/main-interface.interface";
import { Subject, Subscription,timer } from "rxjs";


//[00:55.195]
const timeExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;

interface Handler extends LyricAnalysised {
    lineNumber:number
}


export class LyricAnalysis {
    private lyricRaw:string = "";
    lyricAnalsised:LyricAnalysised[]= [];
    private playing:boolean = false;

    private currentNum:number = 0;
    private startStemp:number = 0;
    
    handler = new Subject<Handler>()
    private timermachine:Subscription | undefined;
    pauseStamp :number = 0;

    constructor(lyricRaw:string){
        this.lyricRaw = lyricRaw;
        this.init();
    }

    private init(){
        this.analysisLyric();
    }

    private analysisLyric(){
        //console.log(this.lyricRaw)
        const lyricArr = this.lyricRaw.split('\n');
        //console.log(lyricArr);
        lyricArr.forEach(lyricItem => this.analysisLyricArr(lyricItem))
    }

    private analysisLyricArr(lyricItem:string){
        const result = timeExp.exec(lyricItem)
        //console.log(result)
        if(result){
            const lyricText = lyricItem.replace(timeExp,'').trim();
            if(lyricText){
                let thridreslut = result[3] || '000';
                const time = Number(result[1]) * 60 * 1000 + Number(result[2]) * 1000 + Number(thridreslut)
                this.lyricAnalsised.push({
                    lyricText:lyricText,
                    lyricTime:time
                })
            }
        }
    }

    lyricplay(startTime = 0,skip = false){
        if(!this.lyricAnalsised.length) return;
        if(!this.playing){
            this.playing = true;
        }
        this.currentNum = this.findCurrentLyricNum(startTime)
        this.startStemp = Date.now() - startTime;
        
        if(!skip){
            this.callHander(this.currentNum - 1);
        }

        if(this.currentNum < this.lyricAnalsised.length){
            if(this.timermachine){
                this.timermachine.unsubscribe();
            }
            this.playRest();
        }
        //
    }
    private findCurrentLyricNum(time:number):number{ 
       const index = this.lyricAnalsised.findIndex(item => time <= item.lyricTime);
       return index === -1 ? this.lyricAnalsised.length -1 : index; 
    }

    //bug
    private playRest(){
        let currentPlay = this.lyricAnalsised[this.currentNum];
        const delay = currentPlay.lyricTime - (Date.now() - this.startStemp);
        this.timermachine = timer(delay).subscribe(()=>{
            this.callHander(this.currentNum ++);
            console.log(this.currentNum)
            if(this.currentNum < this.lyricAnalsised.length && this,this.playing){
                this.playRest();
            }
        })
        
    }

    private callHander(index:number){
        if(index > 0){
            this.handler.next({
            lyricTime:this.lyricAnalsised[index].lyricTime,
            lyricText:this.lyricAnalsised[index].lyricText,
            lineNumber:index
        });
        }
       
    }

    togglePlay(playing:boolean){
        const now = Date.now();
        this.playing = playing;
        if(playing){
            this.lyricplay((this.pauseStamp || now) - (this.startStemp || now),true)
        }else{
            this.stop();
            this.pauseStamp = now
        }
    }

    stop(){
        if(this.playing){
            this.playing = false;
        }
        if(this.timermachine){
            this.timermachine.unsubscribe();
        }
    }

    seek(time:number){
        this.lyricplay(time)
    }
}