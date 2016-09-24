///<reference path="../definitions.d.ts"/>

module Snake.Model{
    export enum MoveState{
        Ok,
        End
    }
    export class MoveResult{
        public changed:Square[];
        public moveState:MoveState;
        public food:Food.FoodSquare[];

        constructor(){
            this.changed = [];
            this.food = [];
        }
    }
}