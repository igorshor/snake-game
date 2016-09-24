///<reference path="../definitions.d.ts"/>
var Snake;
(function (Snake) {
    var View;
    (function (View) {
        var MoveDirection = Snake.Model.MoveDirection;
        var GameView = (function () {
            function GameView(model) {
                this.model = model;
                this.registerEvents();
                this.registerViewEvents();
                this.createGameComponents();
                this.createBoard();
            }
            GameView.prototype.createGameComponents = function () {
                this.boardBody = $('#snakeGame');
                this.gameScore = $('#gameScore');
                this.gameContainer = $('#gameContainer');
                this.specialFoodCountDown = $('#specialFoodCountDown');
                this.specialFoodCountDown.hide();
            };
            GameView.prototype.createBoard = function () {
                this.board = [];
                for (var i = 0; i < this.model.rows; i++) {
                    var row = $('<div class="row"></div>');
                    this.boardBody.prepend(row);
                    this.board[i] = [];
                    for (var j = 0; j < this.model.cols; j++) {
                        var square = $('<div></div>');
                        this.board[i][j] = square;
                        row.append(square);
                    }
                }
            };
            GameView.prototype.registerEvents = function () {
                var _this = this;
                this.model.gameOverEvent.subscribe(function () {
                    var gameOverNotification = $('<div>' +
                        '<div class="notification">' +
                        'Game Over' +
                        '</div>' +
                        '</div>');
                    _this.gameContainer.prepend(gameOverNotification);
                });
                this.model.scoreChangedEvent.subscribe(function (score) {
                    _this.gameScore.html(score.toString());
                });
                this.model.boardChangedEvent.subscribe(function (squares) {
                    squares.forEach(function (square) {
                        var viewSquare = _this.board[square.position.y][square.position.x];
                        viewSquare.removeClass();
                        if (square.state === Snake.Model.SquareState.Snake) {
                            viewSquare.addClass('snake');
                        }
                        else if (square.state === Snake.Model.SquareState.SnakeHead) {
                            viewSquare.addClass('snake-head');
                        }
                        else if (square.state === Snake.Model.SquareState.Food) {
                            viewSquare.addClass('snake-food');
                        }
                        else if (square.state === Snake.Model.SquareState.SpecialFood) {
                            var specialFood = square;
                            _this.specialFoodHandle(viewSquare, specialFood);
                        }
                    });
                });
            };
            GameView.prototype.registerViewEvents = function () {
                var _this = this;
                this.directionChanged = new Snake.Helpers.EventEmitter();
                var KEY_UP = 38;
                var KEY_DOWN = 40;
                var KEY_LEFT = 37;
                var KEY_RIGHT = 39;
                $(document).keydown(function (event) {
                    if (event.keyCode >= 37 && event.keyCode <= 40) {
                        var direction;
                        if (event.keyCode == KEY_UP) {
                            direction = MoveDirection.Up;
                        }
                        else if (event.keyCode == KEY_DOWN) {
                            direction = MoveDirection.Down;
                        }
                        else if (event.keyCode == KEY_LEFT) {
                            direction = MoveDirection.Left;
                        }
                        else if (event.keyCode == KEY_RIGHT) {
                            direction = MoveDirection.Right;
                        }
                        _this.directionChanged.publish(direction);
                    }
                });
            };
            GameView.prototype.specialFoodHandle = function (viewSquare, specialFood) {
                var _this = this;
                specialFood.specialFoodCountDownEvent.subscribe(function (countDown) {
                    _this.specialFoodCountDown.html(countDown.toString());
                });
                specialFood.specialFoodHiddenEvent.subscribe(function () {
                    _this.specialFoodCountDown.hide();
                    viewSquare.removeClass();
                });
                specialFood.specialFoodShownEvents.subscribe(function () {
                    _this.specialFoodCountDown.show();
                    viewSquare.addClass('snake-special-food');
                });
            };
            return GameView;
        }());
        View.GameView = GameView;
    })(View = Snake.View || (Snake.View = {}));
})(Snake || (Snake = {}));
//# sourceMappingURL=view.js.map