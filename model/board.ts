///<reference path="../definitions.d.ts"/>

module Snake.Model {
    export class Board {
        private board:Square[][];

        public constructor(public cols:number, public  rows:number) {
            this.createBoard(cols, rows);
        }

        private createBoard(cols:Number, rows:Number):void {
            this.board = [];
            for (var i = 0; i < cols; i++) {
                this.board[i] = [];
                for (var j = 0; j < rows; j++) {
                    this.board[i][j] = new Square(i, j);
                }
            }
        }

        public getSquareByPosition(pos:Position):Square {
            return this.board[pos.x][pos.y];
        }
    }
}