///<reference path="../definitions.d.ts"/>

module Snake.Controller {
    export class GameController {
        constructor(private game:Model.IModel, private view:View.IView) {
            this.registerViewEvents();
        }

        private move(move:Model.MoveDirection) {
            this.game.changeDirection(move);
        }

        public start() {
            this.init();
            this.game.start();
        }

        private init() {
            this.game.init();
        }

        private registerViewEvents() {
            this.view.directionChanged.subscribe((move:Model.MoveDirection)=> this.move(move));
        }
    }
}