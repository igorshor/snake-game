///<reference path="definitions.d.ts"/>

module Snake{
    var model = new Model.GameManager(30, 30, true);
    var view = new View.GameView(model);
    var controller = new Controller.GameController(model, view);

    controller.start();
}