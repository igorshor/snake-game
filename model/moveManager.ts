///<reference path="../definitions.d.ts"/>

module Snake.Model {
    export enum MoveDirection{
        Up,
        Down,
        Left,
        Right
    }

    export class MoveManager {
        private gameRules:Rules;

        public constructor(private gameBoard:Board, private snake:Snake, private foodManager:Food.FoodManager) {
            this.gameRules = new Rules();
        }

        public move(moveDescriptor:MoveDirection):MoveResult {
            var moveResult = new MoveResult();
            var validMove = this.gameRules.ValidMove(this.gameBoard, this.snake, moveDescriptor);

            if (validMove) {
                this.doLogicMove(moveDescriptor, moveResult);
            }

            moveResult.moveState = validMove ? MoveState.Ok : MoveState.End;

            return moveResult;
        }

        private doLogicMove(moveDescriptor:MoveDirection, moveResult:MoveResult) {
            var position = MoveHelpers.getNextPosition(moveDescriptor, this.snake.getHead());
            var nextSquare = this.gameBoard.getSquareByPosition(position);

            moveResult.changed.push(nextSquare);
            moveResult.changed.push(this.snake.getHead());
            if (nextSquare.state === SquareState.Empty) {
                this.moveStep(moveResult, nextSquare);
            }
            else if (nextSquare.state === SquareState.Food) {
                this.eatStep(moveResult, nextSquare, position);
            }
        }

        private moveStep(moveResult:MoveResult, nextSquare:Square) {
            moveResult.changed.push(this.snake.getTail());
            this.snake.crawl(nextSquare);
            moveResult.food = this.foodManager.food;
        }

        private eatStep(moveResult:MoveResult, nextSquare:Square, position:Position) {
            moveResult.changed.push(this.snake.getTail());
            this.snake.eat(nextSquare);
            this.foodManager.removeFood(position, true);

            if (this.foodManager.getFoodCount() === 0) {
                var food = this.foodManager.createFood();
                moveResult.changed.push(food);
                moveResult.food.push(food);
            }
        }
    }
}