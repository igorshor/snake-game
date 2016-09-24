///<reference path="../definitions.d.ts"/>
var Snake;
(function (Snake) {
    var Model;
    (function (Model) {
        (function (MoveDirection) {
            MoveDirection[MoveDirection["Up"] = 0] = "Up";
            MoveDirection[MoveDirection["Down"] = 1] = "Down";
            MoveDirection[MoveDirection["Left"] = 2] = "Left";
            MoveDirection[MoveDirection["Right"] = 3] = "Right";
        })(Model.MoveDirection || (Model.MoveDirection = {}));
        var MoveDirection = Model.MoveDirection;
        var MoveManager = (function () {
            function MoveManager(gameBoard, snake, foodManager) {
                this.gameBoard = gameBoard;
                this.snake = snake;
                this.foodManager = foodManager;
                this.gameRules = new Model.Rules();
            }
            MoveManager.prototype.move = function (moveDescriptor) {
                var moveResult = new Model.MoveResult();
                var validMove = this.gameRules.ValidMove(this.gameBoard, this.snake, moveDescriptor);
                if (validMove) {
                    this.doLogicMove(moveDescriptor, moveResult);
                }
                moveResult.moveState = validMove ? Model.MoveState.Ok : Model.MoveState.End;
                return moveResult;
            };
            MoveManager.prototype.doLogicMove = function (moveDescriptor, moveResult) {
                var position = Model.MoveHelpers.getNextPosition(moveDescriptor, this.snake.getHead());
                var nextSquare = this.gameBoard.getSquareByPosition(position);
                moveResult.changed.push(nextSquare);
                moveResult.changed.push(this.snake.getHead());
                if (nextSquare.state === Model.SquareState.Empty) {
                    this.moveStep(moveResult, nextSquare);
                }
                else if (nextSquare.state === Model.SquareState.Food) {
                    this.eatStep(moveResult, nextSquare, position);
                }
            };
            MoveManager.prototype.moveStep = function (moveResult, nextSquare) {
                moveResult.changed.push(this.snake.getTail());
                this.snake.crawl(nextSquare);
                moveResult.food = this.foodManager.food;
            };
            MoveManager.prototype.eatStep = function (moveResult, nextSquare, position) {
                moveResult.changed.push(this.snake.getTail());
                this.snake.eat(nextSquare);
                this.foodManager.removeFood(position, true);
                if (this.foodManager.getFoodCount() === 0) {
                    var food = this.foodManager.createFood();
                    moveResult.changed.push(food);
                    moveResult.food.push(food);
                }
            };
            return MoveManager;
        }());
        Model.MoveManager = MoveManager;
    })(Model = Snake.Model || (Snake.Model = {}));
})(Snake || (Snake = {}));
//# sourceMappingURL=moveManager.js.map