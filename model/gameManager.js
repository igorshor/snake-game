///<reference path="../definitions.d.ts"/>
var Snake;
(function (Snake) {
    var Model;
    (function (Model) {
        var GameManager = (function () {
            function GameManager(cols, rows, transparentWallsMode) {
                var _this = this;
                if (transparentWallsMode === void 0) { transparentWallsMode = false; }
                this.cols = cols;
                this.rows = rows;
                this.transparentWallsMode = transparentWallsMode;
                this.scoreFactor = 5;
                this.specialScoreMultiplyFactor = 4;
                this.doLogicMove = function () {
                    var moveResults = _this.moveManager.move(_this.moveDirection);
                    if (moveResults.moveState === Model.MoveState.Ok) {
                        _this.boardChangedEvent.publish(moveResults.changed);
                    }
                    else {
                        _this.gameOverEvent.publish(undefined);
                        clearInterval(_this.gameGeneration);
                    }
                };
                this.score = 0;
                this.setAppSettings();
                this.gameBoard = new Model.Board(cols, rows);
                this.moveDirection = Model.MoveDirection.Right;
                this.initSnake();
                this.foodManager = new Model.Food.FoodManager(this.gameBoard, this.gameSnake);
                this.moveManager = new Model.MoveManager(this.gameBoard, this.gameSnake, this.foodManager);
                this.gameSpeed = 120;
                this.boardChangedEvent = new Snake.Helpers.EventEmitter();
                this.gameOverEvent = new Snake.Helpers.EventEmitter();
                this.scoreChangedEvent = new Snake.Helpers.EventEmitter();
                this.registerModelEvents();
            }
            GameManager.prototype.init = function () {
                this.boardChangedEvent.publish(this.gameSnake.getSnake());
                this.boardChangedEvent.publish(this.foodManager.food);
            };
            GameManager.prototype.start = function () {
                this.gameGeneration = setInterval(this.doLogicMove, this.gameSpeed);
            };
            GameManager.prototype.changeDirection = function (moveDirection) {
                if (this.moveDirection === moveDirection) {
                    return;
                }
                this.moveDirection = moveDirection;
            };
            GameManager.prototype.initSnake = function () {
                var head = this.gameBoard.getSquareByPosition({ x: 10, y: 10 });
                var body = [
                    this.gameBoard.getSquareByPosition({ x: 8, y: 10 }),
                    this.gameBoard.getSquareByPosition({ x: 9, y: 10 })
                ];
                this.gameSnake = new Model.Snake(body, this.moveDirection);
            };
            GameManager.prototype.registerModelEvents = function () {
                var _this = this;
                this.gameSnake.snakeEatenEvent.subscribe(function (food) {
                    if (food.state == Model.SquareState.Food) {
                        _this.score += _this.scoreFactor;
                    }
                    else if (food.state == Model.SquareState.SpecialFood) {
                        _this.score += (_this.scoreFactor * _this.specialScoreMultiplyFactor);
                    }
                    _this.scoreChangedEvent.publish(_this.score);
                });
            };
            GameManager.prototype.setAppSettings = function () {
                Model.AppSettings.TransparentWallsMode = this.transparentWallsMode;
                Model.AppSettings.Cols = this.cols;
                Model.AppSettings.Rows = this.rows;
            };
            return GameManager;
        }());
        Model.GameManager = GameManager;
    })(Model = Snake.Model || (Snake.Model = {}));
})(Snake || (Snake = {}));
//# sourceMappingURL=gameManager.js.map