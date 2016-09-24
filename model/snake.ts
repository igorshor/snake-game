///<reference path="../definitions.d.ts"/>

module Snake.Model {
    export class Snake {
        private body:Square[];
        snakeChangedEvent:Helpers.EventEmitter<Square[]>;
        snakeEatenEvent:Helpers.EventEmitter<Square>;

        public constructor(body:Square[], public direction:MoveDirection) {
            this.snakeChangedEvent = new Helpers.EventEmitter<Square[]>();
            this.snakeEatenEvent = new Helpers.EventEmitter<Square>();
            this.body = [];
            body.forEach((square:Square)=>this.eat(square));
        }

        public eat(square:Square) {
            var eatenSquare = $.extend({}, square);
            var head = this.getHead();
            if(head){
                this.getHead().state = SquareState.Snake;
            }

            square.state = SquareState.SnakeHead;
            this.body.unshift(square);
            this.snakeChangedEvent.publish(this.body);
            this.snakeEatenEvent.publish(eatenSquare);
        }

        public getLength():number {
            return this.body.length + 1;
        }

        public getSnake():Square[] {
            return this.body;
        }

        public getHead():Square {
            if (!this.body || this.body.length <= 0) {
                return;
            }

            return this.body[0];
        }

        public getTail():Square {
            if (!this.body || this.body.length <= 0) {
                return;
            }

            return this.body[this.body.length - 1];
        }

        public crawl(square:Square) {
            this.eat(square);

            var oldTail:Square = this.body.pop();
            oldTail.state = SquareState.Empty;
        }
        
        public imSnake(squareToFind:Square):boolean{
            this.body.forEach((square:Square)=> {
                if(square === squareToFind){
                    return true;
                }
            });
            
            return false;
        }
    }
}