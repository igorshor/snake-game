///<reference path="../definitions.d.ts"/>
var Snake;
(function (Snake_1) {
    var Model;
    (function (Model) {
        var Snake = (function () {
            function Snake(body, direction) {
                var _this = this;
                this.direction = direction;
                this.snakeChangedEvent = new Snake_1.Helpers.EventEmitter();
                this.snakeEatenEvent = new Snake_1.Helpers.EventEmitter();
                this.body = [];
                body.forEach(function (square) { return _this.eat(square); });
            }
            Snake.prototype.eat = function (square) {
                var eatenSquare = $.extend({}, square);
                var head = this.getHead();
                if (head) {
                    this.getHead().state = Model.SquareState.Snake;
                }
                square.state = Model.SquareState.SnakeHead;
                this.body.unshift(square);
                this.snakeChangedEvent.publish(this.body);
                this.snakeEatenEvent.publish(eatenSquare);
            };
            Snake.prototype.getLength = function () {
                return this.body.length + 1;
            };
            Snake.prototype.getSnake = function () {
                return this.body;
            };
            Snake.prototype.getHead = function () {
                if (!this.body || this.body.length <= 0) {
                    return;
                }
                return this.body[0];
            };
            Snake.prototype.getTail = function () {
                if (!this.body || this.body.length <= 0) {
                    return;
                }
                return this.body[this.body.length - 1];
            };
            Snake.prototype.crawl = function (square) {
                this.eat(square);
                var oldTail = this.body.pop();
                oldTail.state = Model.SquareState.Empty;
            };
            Snake.prototype.imSnake = function (squareToFind) {
                this.body.forEach(function (square) {
                    if (square === squareToFind) {
                        return true;
                    }
                });
                return false;
            };
            return Snake;
        }());
        Model.Snake = Snake;
    })(Model = Snake_1.Model || (Snake_1.Model = {}));
})(Snake || (Snake = {}));
//# sourceMappingURL=snake.js.map