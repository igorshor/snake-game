///<reference path="../definitions.d.ts"/>

module Snake.Model {
    export class MoveHelpers {

        public static getNextPosition(moveDirection:MoveDirection, head:Square):Position {
            if (moveDirection == MoveDirection.Up) {
                return {
                    x: (head.position.x + AppSettings.Cols)% (AppSettings.Cols + ( AppSettings.TransparentWallsMode ? 0 : 1)),
                    y: (head.position.y + AppSettings.Rows + 1) % (AppSettings.Rows + ( AppSettings.TransparentWallsMode ? 0 : 1))
                };
            }
            else if (moveDirection == MoveDirection.Down) {
                return {
                    x: (head.position.x + AppSettings.Cols) % (AppSettings.Cols + ( AppSettings.TransparentWallsMode ? 0 : 1)),
                    y: (head.position.y + AppSettings.Rows - 1) % (AppSettings.Rows + ( AppSettings.TransparentWallsMode ? 0 : 1))
                };
            }
            else if (moveDirection == MoveDirection.Left) {
                return {
                    x: (head.position.x + AppSettings.Cols - 1) % (AppSettings.Cols + ( AppSettings.TransparentWallsMode ? 0 : 1)),
                    y: (head.position.y + AppSettings.Rows) % (AppSettings.Rows + ( AppSettings.TransparentWallsMode ? 0 : 1))
                };
            }
            else if (moveDirection == MoveDirection.Right) {
                return {
                    x: (head.position.x + AppSettings.Cols + 1) % (AppSettings.Cols + ( AppSettings.TransparentWallsMode ? 0 : 1)),
                    y: (head.position.y + AppSettings.Rows) % (AppSettings.Rows + ( AppSettings.TransparentWallsMode ? 0 : 1))
                };
            }
        }
    }
}