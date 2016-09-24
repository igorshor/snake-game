///<reference path="../definitions.d.ts"/>
var Snake;
(function (Snake) {
    var Model;
    (function (Model) {
        var Board = (function () {
            function Board(cols, rows) {
                this.cols = cols;
                this.rows = rows;
                this.createBoard(cols, rows);
            }
            Board.prototype.createBoard = function (cols, rows) {
                this.board = [];
                for (var i = 0; i < cols; i++) {
                    this.board[i] = [];
                    for (var j = 0; j < rows; j++) {
                        this.board[i][j] = new Model.Square(i, j);
                    }
                }
            };
            Board.prototype.getSquareByPosition = function (pos) {
                return this.board[pos.x][pos.y];
            };
            return Board;
        }());
        Model.Board = Board;
    })(Model = Snake.Model || (Snake.Model = {}));
})(Snake || (Snake = {}));
//# sourceMappingURL=board.js.map