///<reference path="definitions.d.ts"/>
var Snake;
(function (Snake) {
    var model = new Snake.Model.GameManager(30, 30, true);
    var view = new Snake.View.GameView(model);
    var controller = new Snake.Controller.GameController(model, view);
    controller.start();
})(Snake || (Snake = {}));
//# sourceMappingURL=app.js.map