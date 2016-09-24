///<reference path="../definitions.d.ts"/>

module Snake.Helpers{
    export class EventEmitter<T>{
        private events:((args:T)=>void)[];

        public constructor(){
            this.events = []
        }

        public subscribe(func:(args:T)=>void){
            if(this.events){
                this.events.push(func);
            }
        }

        public unSubscribeFunction(func:(args:T)=>void){
            if(this.events){
                var index = this.events.indexOf(func);
                if(index >= 0 ){
                    this.events[name].splice(index, 1);
                }
            }

            this.events[name].push(func);
        }

        public publish(args:T){
            if(this.events){
                this.events.forEach((func:(args:T)=>void)=>{
                    func(args);
                })
            }
        }
    }
}