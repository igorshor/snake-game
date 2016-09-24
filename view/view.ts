///<reference path="../definitions.d.ts"/>

module Snake.View {
    import MoveDirection = Snake.Model.MoveDirection;
    import SpecialFood = Snake.Model.Food.SpecialFood;
    export interface IView {
        directionChanged:Helpers.EventEmitter<Model.MoveDirection>;
    }

    export class GameView implements IView {
        private boardBody:JQuery;
        private gameContainer:JQuery;
        private gameScore:JQuery;
        private specialFoodCountDown:JQuery;
        private board:JQuery[][];

        public directionChanged:Helpers.EventEmitter<Model.MoveDirection>;

        constructor(private model:Model.IModel) {
            this.registerEvents();
            this.registerViewEvents();
            this.createGameComponents();
            this.createBoard();
        }

        private createGameComponents() {
            this.boardBody = $('#snakeGame');
            this.gameScore = $('#gameScore');
            this.gameContainer = $('#gameContainer');
            this.specialFoodCountDown = $('#specialFoodCountDown');
            this.specialFoodCountDown.hide();
        }

        private createBoard() {
            this.board = [];
            for (var i = 0; i < this.model.rows; i++) {
                var row = $('<div class="row"></div>');
                this.boardBody.prepend(row);
                this.board[i] = [];
                for (var j = 0; j < this.model.cols; j++) {
                    var square = $('<div></div>');
                    this.board[i][j] = square;
                    row.append(square);
                }
            }
        }

        private registerEvents() {
            this.model.gameOverEvent.subscribe(()=> {
                var gameOverNotification = $(
                    '<div>' +
                    '<div class="notification">' +
                    'Game Over' +
                    '</div>' +
                    '</div>');

                this.gameContainer.prepend(gameOverNotification);
            });

            this.model.scoreChangedEvent.subscribe((score:number)=> {
                this.gameScore.html(score.toString());
            });

            this.model.boardChangedEvent.subscribe((squares:Model.Square[])=> {
                squares.forEach((square:Model.Square)=> {
                    var viewSquare:JQuery = this.board[square.position.y][square.position.x];

                    viewSquare.removeClass();

                    if (square.state === Model.SquareState.Snake) {
                        viewSquare.addClass('snake')
                    }
                    else if (square.state === Model.SquareState.SnakeHead) {
                        viewSquare.addClass('snake-head')
                    }
                    else if (square.state === Model.SquareState.Food) {
                        viewSquare.addClass('snake-food')
                    }
                    else if (square.state === Model.SquareState.SpecialFood) {
                        var specialFood = square as SpecialFood;
                        this.specialFoodHandle(viewSquare, specialFood);
                    }
                })
            })
        }

        private registerViewEvents() {
            this.directionChanged = new Helpers.EventEmitter<Model.MoveDirection>();

            const KEY_UP = 38;
            const KEY_DOWN = 40;
            const KEY_LEFT = 37;
            const KEY_RIGHT = 39;

            $(document).keydown((event:JQueryKeyEventObject)=> {
                if (event.keyCode >= 37 && event.keyCode <= 40) {
                    var direction:Model.MoveDirection;
                    if (event.keyCode == KEY_UP) {
                        direction = MoveDirection.Up;
                    }
                    else if (event.keyCode == KEY_DOWN) {
                        direction = MoveDirection.Down;
                    }
                    else if (event.keyCode == KEY_LEFT) {
                        direction = MoveDirection.Left;
                    }
                    else if (event.keyCode == KEY_RIGHT) {
                        direction = MoveDirection.Right;
                    }

                    this.directionChanged.publish(direction);
                }
            })
        }

        private specialFoodHandle(viewSquare:JQuery, specialFood:SpecialFood) {
            specialFood.specialFoodCountDownEvent.subscribe((countDown:number)=> {
                this.specialFoodCountDown.html(countDown.toString());
            });

            specialFood.specialFoodHiddenEvent.subscribe(()=> {
                this.specialFoodCountDown.hide();
                viewSquare.removeClass();
            });

            specialFood.specialFoodShownEvents.subscribe(()=> {
                this.specialFoodCountDown.show();
                viewSquare.addClass('snake-special-food')
            });
        }
    }
}