///<reference path="../../definitions.d.ts"/>

module Snake.Model.Food{
    export class SpecialFood extends Square{
        public specialFoodShownEvents:Helpers.EventEmitter<Square>;
        public specialFoodHiddenEvent:Helpers.EventEmitter<Square>;
        public specialFoodCountDownEvent:Helpers.EventEmitter<number>;

        private intervalThreshHold = 30;

        constructor(position:Position, private foodKind:FoodKind, private milliseconds:number) {
            super(position.x, position.y);
            this.state = SquareState.SpecialFood;
            this.specialFoodShownEvents = new Helpers.EventEmitter<Square>();
            this.specialFoodHiddenEvent = new Helpers.EventEmitter<Square>();
            this.specialFoodCountDownEvent = new Helpers.EventEmitter<number>();

            this.kickStart()
        }


        private kickStart() {
            this.specialFoodShownEvents.publish(this);

            var interval = setInterval(()=>{
                this.milliseconds -= this.intervalThreshHold;
                if(this.milliseconds <= 0){
                    clearInterval(interval);
                    this.specialFoodHiddenEvent.publish(this);
                }
                this.specialFoodCountDownEvent.publish(this.milliseconds);
            }, this.intervalThreshHold)
        }
    }
}