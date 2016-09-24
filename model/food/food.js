///<reference path="../../definitions.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Snake;
(function (Snake) {
    var Model;
    (function (Model) {
        var Food;
        (function (Food) {
            (function (FoodKind) {
                FoodKind[FoodKind["Fruit"] = 0] = "Fruit";
                FoodKind[FoodKind["Meet"] = 1] = "Meet";
                FoodKind[FoodKind["Vegetable"] = 2] = "Vegetable";
            })(Food.FoodKind || (Food.FoodKind = {}));
            var FoodKind = Food.FoodKind;
            var FoodSquare = (function (_super) {
                __extends(FoodSquare, _super);
                function FoodSquare(position, foodKind) {
                    _super.call(this, position.x, position.y);
                    this.foodKind = foodKind;
                    this.state = Model.SquareState.Food;
                }
                return FoodSquare;
            }(Model.Square));
            Food.FoodSquare = FoodSquare;
        })(Food = Model.Food || (Model.Food = {}));
    })(Model = Snake.Model || (Snake.Model = {}));
})(Snake || (Snake = {}));
//# sourceMappingURL=food.js.map