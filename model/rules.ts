///<reference path="../definitions.d.ts"/>

module Snake.Model {
    export class Rules {
        public ValidMove(gameBoard:Board, snake:Snake, move:MoveDirection):boolean {
            var position = MoveHelpers.getNextPosition(move, snake.getHead());
            return this.checkBoardBoundary(gameBoard, position) &&
                this.validateMove(gameBoard.getSquareByPosition(position))
        }

        private checkBoardBoundary(gameBoard:Board, position:Position):boolean {
            if (gameBoard.cols - 1 < position.x || position.x < 0) {
                return false;
            }

            if (gameBoard.rows - 1 < position.y || position.y < 0) {
                return false;
            }

            return true;
        }


        private validateMove(nexMovePosition:Square):boolean {
            return nexMovePosition.state !== SquareState.Snake &&
                nexMovePosition.state !== SquareState.Wall;
        }
    }
}