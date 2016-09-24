///<reference path="../definitions.d.ts"/>

module Snake.Model {
    export interface Position {
        x:number;
        y:number;
    }

    export enum SquareState{
        Empty = 0,
        Snake,
        SnakeHead,
        Food,
        Wall,
        SpecialFood
    }

    export class Square {
        public position:Position;
        public state:SquareState;

        public constructor(private col:number, private row:number) {
            this.state = SquareState.Empty;
            this.position = {x:this.col, y:this.row};
        }
    }
}