///<reference path="../definitions.d.ts"/>
var Snake;
(function (Snake) {
    var Model;
    (function (Model) {
        (function (MoveState) {
            MoveState[MoveState["Ok"] = 0] = "Ok";
            MoveState[MoveState["End"] = 1] = "End";
        })(Model.MoveState || (Model.MoveState = {}));
        var MoveState = Model.MoveState;
        var MoveResult = (function () {
            function MoveResult() {
                this.changed = [];
                this.food = [];
            }
            return MoveResult;
        }());
        Model.MoveResult = MoveResult;
    })(Model = Snake.Model || (Snake.Model = {}));
})(Snake || (Snake = {}));
//# sourceMappingURL=moveResult.js.map