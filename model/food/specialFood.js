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
            var SpecialFood = (function (_super) {
                __extends(SpecialFood, _super);
                function SpecialFood(position, foodKind, milliseconds) {
                    _super.call(this, position.x, position.y);
                    this.foodKind = foodKind;
                    this.milliseconds = milliseconds;
                    this.intervalThreshHold = 30;
                    this.state = Model.SquareState.SpecialFood;
                    this.specialFoodShownEvents = new Snake.Helpers.EventEmitter();
                    this.specialFoodHiddenEvent = new Snake.Helpers.EventEmitter();
                    this.specialFoodCountDownEvent = new Snake.Helpers.EventEmitter();
                    this.kickStart();
                }
                SpecialFood.prototype.kickStart = function () {
                    var _this = this;
                    this.specialFoodShownEvents.publish(this);
                    var interval = setInterval(function () {
                        _this.milliseconds -= _this.intervalThreshHold;
                        if (_this.milliseconds <= 0) {
                            clearInterval(interval);
                            _this.specialFoodHiddenEvent.publish(_this);
                        }
                        _this.specialFoodCountDownEvent.publish(_this.milliseconds);
                    }, this.intervalThreshHold);
                };
                return SpecialFood;
            }(Model.Square));
            Food.SpecialFood = SpecialFood;
        })(Food = Model.Food || (Model.Food = {}));
    })(Model = Snake.Model || (Snake.Model = {}));
})(Snake || (Snake = {}));
//# sourceMappingURL=specialFood.js.map