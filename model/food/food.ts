///<reference path="../../definitions.d.ts"/>

module Snake.Model.Food {
    export enum FoodKind{
        Fruit,
        Meet,
        Vegetable
    }
    export class FoodSquare extends Square {
        constructor(position:Position, private foodKind:FoodKind) {
            super(position.x, position.y);
            this.state = SquareState.Food;
        }
    }
}