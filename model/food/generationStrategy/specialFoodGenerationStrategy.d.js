///<reference path="../../definitions.d.ts"/>
var Snake;
(function (Snake) {
    var Model;
    (function (Model) {
        var Food;
        (function (Food) {
            var SpecialFoodGenerationStrategies = (function () {
                function SpecialFoodGenerationStrategies() {
                }
                return SpecialFoodGenerationStrategies;
            }());
            Food.SpecialFoodGenerationStrategies = SpecialFoodGenerationStrategies;
        })(Food = Model.Food || (Model.Food = {}));
    })(Model = Snake.Model || (Snake.Model = {}));
})(Snake || (Snake = {}));
//# sourceMappingURL=specialFoodGenerationStrategies.js.map