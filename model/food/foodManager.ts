///<reference path="../../definitions.d.ts"/>

module Snake.Model.Food {
    export class FoodManager {
        private foodGenerator:FoodGenerator;
        public food:FoodSquare[];

        constructor(private board:Board, private snake:Snake) {
            this.foodGenerator = new FoodGenerator(board, snake);
            this.food = [];
            this.createFood();
        }

        public createFood():FoodSquare {
            var food:FoodSquare = this.foodGenerator.getFood();
            var square = this.board.getSquareByPosition(food.position);
            square.state = SquareState.Food;
            this.food.push(food);
            return food;
        }

        public removeFood(position:Position, eat:boolean) {
            var food = this.getFoodByPosition(position);
            var index = this.food.indexOf(food);

            if (index >= 0) {
                this.food.splice(index, 1);
            }

            var square = this.board.getSquareByPosition(food.position);

            square.state = eat ? SquareState.Food : SquareState.Empty;
        }

        private getFoodByPosition(position:Position):FoodSquare {
            for(var i=0 ; i<this.food.length ; i++){
                var food = this.food[i];
                if(food.position.x === position.x && food.position.y === position.y){
                    return food;
                }
            }

            return null;
        }
        
        public getFoodCount(){
            return this.food.length;
        }
    }

}