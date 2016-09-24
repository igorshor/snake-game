///<reference path="../../definitions.d.ts"/>
var Snake;
(function (Snake) {
    var Model;
    (function (Model) {
        var Food;
        (function (Food) {
            var FoodManager = (function () {
                function FoodManager(board, snake) {
                    this.board = board;
                    this.snake = snake;
                    this.foodGenerator = new Food.FoodGenerator(board, snake);
                    this.food = [];
                    this.createFood();
                }
                FoodManager.prototype.createFood = function () {
                    var food = this.foodGenerator.getFood();
                    var square = this.board.getSquareByPosition(food.position);
                    square.state = Model.SquareState.Food;
                    this.food.push(food);
                    return food;
                };
                FoodManager.prototype.removeFood = function (position, eat) {
                    var food = this.getFoodByPosition(position);
                    var index = this.food.indexOf(food);
                    if (index >= 0) {
                        this.food.splice(index, 1);
                    }
                    var square = this.board.getSquareByPosition(food.position);
                    square.state = eat ? Model.SquareState.Food : Model.SquareState.Empty;
                };
                FoodManager.prototype.getFoodByPosition = function (position) {
                    for (var i = 0; i < this.food.length; i++) {
                        var food = this.food[i];
                        if (food.position.x === position.x && food.position.y === position.y) {
                            return food;
                        }
                    }
                    return null;
                };
                FoodManager.prototype.getFoodCount = function () {
                    return this.food.length;
                };
                return FoodManager;
            }());
            Food.FoodManager = FoodManager;
        })(Food = Model.Food || (Model.Food = {}));
    })(Model = Snake.Model || (Snake.Model = {}));
})(Snake || (Snake = {}));
//# sourceMappingURL=foodManager.js.map