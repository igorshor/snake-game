///<reference path="../../definitions.d.ts"/>
var Snake;
(function (Snake) {
    var Model;
    (function (Model) {
        var Food;
        (function (Food) {
            var FoodGenerator = (function () {
                function FoodGenerator(board, snake) {
                    this.board = board;
                    this.snake = snake;
                }
                FoodGenerator.prototype.getFood = function () {
                    var foodPosition = this.getRandomBoardPosition();
                    var foodKind = this.getRandomFoodKind();
                    return new Food.FoodSquare(foodPosition, foodKind);
                };
                FoodGenerator.prototype.getRandomBoardPosition = function () {
                    var validBoardPosition = false;
                    var randomPosition;
                    while (!validBoardPosition) {
                        randomPosition = {
                            x: this.getRandomIntInclusive(0, this.board.cols - 1),
                            y: this.getRandomIntInclusive(0, this.board.rows - 1)
                        };
                        var randomSquare = this.board.getSquareByPosition(randomPosition);
                        validBoardPosition = !this.snake.imSnake(randomSquare);
                    }
                    return randomPosition;
                };
                FoodGenerator.prototype.getRandomIntInclusive = function (min, max) {
                    var minimum = Math.ceil(min);
                    var maximum = Math.floor(max);
                    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
                };
                FoodGenerator.prototype.getRandomFoodKind = function () {
                    var randomNumber = this.getRandomIntInclusive(1, 3);
                    switch (randomNumber) {
                        case 1:
                            {
                                return Food.FoodKind.Fruit;
                            }
                        case 2:
                            {
                                return Food.FoodKind.Meet;
                            }
                        case 3:
                            {
                                return Food.FoodKind.Vegetable;
                            }
                    }
                };
                return FoodGenerator;
            }());
            Food.FoodGenerator = FoodGenerator;
        })(Food = Model.Food || (Model.Food = {}));
    })(Model = Snake.Model || (Snake.Model = {}));
})(Snake || (Snake = {}));
//# sourceMappingURL=foodGenerator.js.map