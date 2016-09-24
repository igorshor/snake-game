///<reference path="../definitions.d.ts"/>

module Snake.Model {
    export interface IModel {
        cols:number;
        rows:number;
        boardChangedEvent:Helpers.EventEmitter<Square[]>;
        gameOverEvent:Helpers.EventEmitter<void>;
        scoreChangedEvent:Helpers.EventEmitter<number>;
        changeDirection(moveDirection:MoveDirection);
        init();
        start();
    }

    export class GameManager implements IModel {
        private score:number;
        private scoreFactor = 5;
        private specialScoreMultiplyFactor = 4;
        private gameSpeed:number;
        private gameBoard:Board;
        private gameSnake:Snake;
        private moveManager:MoveManager;
        private moveDirection:MoveDirection;
        private gameGeneration:number;
        private foodManager:Food.FoodManager;

        public boardChangedEvent:Helpers.EventEmitter<Square[]>;
        public gameOverEvent:Helpers.EventEmitter<void>;
        public scoreChangedEvent:Helpers.EventEmitter<number>;

        public constructor(public cols:number, public  rows:number, private transparentWallsMode:boolean = false) {
            this.score = 0;
            this.setAppSettings();
            this.gameBoard = new Board(cols, rows);
            this.moveDirection = MoveDirection.Right;
            this.initSnake();
            this.foodManager = new Food.FoodManager(this.gameBoard, this.gameSnake);
            this.moveManager = new MoveManager(this.gameBoard, this.gameSnake, this.foodManager);
            this.gameSpeed = 120;
            this.boardChangedEvent = new Helpers.EventEmitter<Square[]>();
            this.gameOverEvent = new Helpers.EventEmitter<void>();
            this.scoreChangedEvent = new Helpers.EventEmitter<number>();

            this.registerModelEvents();
        }

        public init() {
            this.boardChangedEvent.publish(this.gameSnake.getSnake());
            this.boardChangedEvent.publish(this.foodManager.food);

        }

        public start() {
            this.gameGeneration = setInterval(this.doLogicMove, this.gameSpeed);
        }

        private doLogicMove = ()=> {
            var moveResults = this.moveManager.move(this.moveDirection);

            if (moveResults.moveState === MoveState.Ok) {
                this.boardChangedEvent.publish(moveResults.changed);
            }
            else {
                this.gameOverEvent.publish(undefined);
                clearInterval(this.gameGeneration);
            }
        };

        public changeDirection(moveDirection:MoveDirection) {
            if (this.moveDirection === moveDirection) {
                return;
            }

            this.moveDirection = moveDirection;
        }

        private initSnake() {
            var head = this.gameBoard.getSquareByPosition({x: 10, y: 10});
            var body = [
                this.gameBoard.getSquareByPosition({x: 8, y: 10}),
                this.gameBoard.getSquareByPosition({x: 9, y: 10})
            ];

            this.gameSnake = new Snake(body, this.moveDirection);
        }

        private registerModelEvents() {
            this.gameSnake.snakeEatenEvent.subscribe((food:Square)=> {
                if (food.state == SquareState.Food) {
                    this.score += this.scoreFactor;
                }
                else if (food.state == SquareState.SpecialFood) {
                    this.score += (this.scoreFactor * this.specialScoreMultiplyFactor);
                }

                this.scoreChangedEvent.publish(this.score);
            });
        }

        private setAppSettings() {
            AppSettings.TransparentWallsMode = this.transparentWallsMode;
            AppSettings.Cols = this.cols;
            AppSettings.Rows = this.rows;
        }
    }
}