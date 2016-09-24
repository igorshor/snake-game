///<reference path="../../definitions.d.ts"/>

module Snake.Model.Food {
    export class FoodGenerator {
        constructor(private board:Board, private snake:Snake) {

        }

        public getFood():FoodSquare {
            var foodPosition:Position = this.getRandomBoardPosition();
            var foodKind:FoodKind = this.getRandomFoodKind();

            return new FoodSquare(foodPosition, foodKind);
        }

        getRandomBoardPosition():Position {
            var validBoardPosition = false;
            var randomPosition:Position;
            while (!validBoardPosition)
            {
                randomPosition = {
                    x: this.getRandomIntInclusive(0, this.board.cols - 1),
                    y: this.getRandomIntInclusive(0, this.board.rows - 1)
                };

                var randomSquare:Square = this.board.getSquareByPosition(randomPosition);
                validBoardPosition = !this.snake.imSnake(randomSquare);
            }

            return randomPosition;
        }

        private getRandomIntInclusive(min:number, max:number):number {
            var minimum:number = Math.ceil(min);
            var maximum:number = Math.floor(max);
            return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
        }

        private getRandomFoodKind():FoodKind {
            var randomNumber = this.getRandomIntInclusive(1, 3);
            
            switch (randomNumber) {
                case 1:
                {
                    return FoodKind.Fruit;
                }
                case 2:
                {
                    return FoodKind.Meet;
                }

                case 3:
                {
                    return FoodKind.Vegetable;
                }
            }
        }
    }
}