///<reference path="../definitions.d.ts"/>
var Snake;
(function (Snake) {
    var Controller;
    (function (Controller) {
        var GameController = (function () {
            function GameController(game, view) {
                this.game = game;
                this.view = view;
                this.registerViewEvents();
            }
            GameController.prototype.move = function (move) {
                this.game.changeDirection(move);
            };
            GameController.prototype.start = function () {
                this.init();
                this.game.start();
            };
            GameController.prototype.init = function () {
                this.game.init();
            };
            GameController.prototype.registerViewEvents = function () {
                var _this = this;
                this.view.directionChanged.subscribe(function (move) { return _this.move(move); });
            };
            return GameController;
        }());
        Controller.GameController = GameController;
    })(Controller = Snake.Controller || (Snake.Controller = {}));
})(Snake || (Snake = {}));
//# sourceMappingURL=controller.js.map