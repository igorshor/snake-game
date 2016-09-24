///<reference path="../definitions.d.ts"/>
var Snake;
(function (Snake) {
    var Model;
    (function (Model) {
        var Rules = (function () {
            function Rules() {
            }
            Rules.prototype.ValidMove = function (gameBoard, snake, move) {
                var position = Model.MoveHelpers.getNextPosition(move, snake.getHead());
                return this.checkBoardBoundary(gameBoard, position) &&
                    this.validateMove(gameBoard.getSquareByPosition(position));
            };
            Rules.prototype.checkBoardBoundary = function (gameBoard, position) {
                if (gameBoard.cols - 1 < position.x || position.x < 0) {
                    return false;
                }
                if (gameBoard.rows - 1 < position.y || position.y < 0) {
                    return false;
                }
                return true;
            };
            Rules.prototype.validateMove = function (nexMovePosition) {
                return nexMovePosition.state !== Model.SquareState.Snake &&
                    nexMovePosition.state !== Model.SquareState.Wall;
            };
            return Rules;
        }());
        Model.Rules = Rules;
    })(Model = Snake.Model || (Snake.Model = {}));
})(Snake || (Snake = {}));
//# sourceMappingURL=rules.js.map