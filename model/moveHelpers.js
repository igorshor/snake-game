///<reference path="../definitions.d.ts"/>
var Snake;
(function (Snake) {
    var Model;
    (function (Model) {
        var MoveHelpers = (function () {
            function MoveHelpers() {
            }
            MoveHelpers.getNextPosition = function (moveDirection, head) {
                if (moveDirection == Model.MoveDirection.Up) {
                    return {
                        x: (head.position.x + Model.AppSettings.Cols) % (Model.AppSettings.Cols + (Model.AppSettings.TransparentWallsMode ? 0 : 1)),
                        y: (head.position.y + Model.AppSettings.Rows + 1) % (Model.AppSettings.Rows + (Model.AppSettings.TransparentWallsMode ? 0 : 1))
                    };
                }
                else if (moveDirection == Model.MoveDirection.Down) {
                    return {
                        x: (head.position.x + Model.AppSettings.Cols) % (Model.AppSettings.Cols + (Model.AppSettings.TransparentWallsMode ? 0 : 1)),
                        y: (head.position.y + Model.AppSettings.Rows - 1) % (Model.AppSettings.Rows + (Model.AppSettings.TransparentWallsMode ? 0 : 1))
                    };
                }
                else if (moveDirection == Model.MoveDirection.Left) {
                    return {
                        x: (head.position.x + Model.AppSettings.Cols - 1) % (Model.AppSettings.Cols + (Model.AppSettings.TransparentWallsMode ? 0 : 1)),
                        y: (head.position.y + Model.AppSettings.Rows) % (Model.AppSettings.Rows + (Model.AppSettings.TransparentWallsMode ? 0 : 1))
                    };
                }
                else if (moveDirection == Model.MoveDirection.Right) {
                    return {
                        x: (head.position.x + Model.AppSettings.Cols + 1) % (Model.AppSettings.Cols + (Model.AppSettings.TransparentWallsMode ? 0 : 1)),
                        y: (head.position.y + Model.AppSettings.Rows) % (Model.AppSettings.Rows + (Model.AppSettings.TransparentWallsMode ? 0 : 1))
                    };
                }
            };
            return MoveHelpers;
        }());
        Model.MoveHelpers = MoveHelpers;
    })(Model = Snake.Model || (Snake.Model = {}));
})(Snake || (Snake = {}));
//# sourceMappingURL=moveHelpers.js.map