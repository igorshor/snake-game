///<reference path="../definitions.d.ts"/>
var Snake;
(function (Snake) {
    var Model;
    (function (Model) {
        (function (SquareState) {
            SquareState[SquareState["Empty"] = 0] = "Empty";
            SquareState[SquareState["Snake"] = 1] = "Snake";
            SquareState[SquareState["SnakeHead"] = 2] = "SnakeHead";
            SquareState[SquareState["Food"] = 3] = "Food";
            SquareState[SquareState["Wall"] = 4] = "Wall";
            SquareState[SquareState["SpecialFood"] = 5] = "SpecialFood";
        })(Model.SquareState || (Model.SquareState = {}));
        var SquareState = Model.SquareState;
        var Square = (function () {
            function Square(col, row) {
                this.col = col;
                this.row = row;
                this.state = SquareState.Empty;
                this.position = { x: this.col, y: this.row };
            }
            return Square;
        }());
        Model.Square = Square;
    })(Model = Snake.Model || (Snake.Model = {}));
})(Snake || (Snake = {}));
//# sourceMappingURL=square.js.map