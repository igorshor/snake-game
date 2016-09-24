///<reference path="../definitions.d.ts"/>
var Snake;
(function (Snake) {
    var Helpers;
    (function (Helpers) {
        var EventEmitter = (function () {
            function EventEmitter() {
                this.events = [];
            }
            EventEmitter.prototype.subscribe = function (func) {
                if (this.events) {
                    this.events.push(func);
                }
            };
            EventEmitter.prototype.unSubscribeFunction = function (func) {
                if (this.events) {
                    var index = this.events.indexOf(func);
                    if (index >= 0) {
                        this.events[name].splice(index, 1);
                    }
                }
                this.events[name].push(func);
            };
            EventEmitter.prototype.publish = function (args) {
                if (this.events) {
                    this.events.forEach(function (func) {
                        func(args);
                    });
                }
            };
            return EventEmitter;
        }());
        Helpers.EventEmitter = EventEmitter;
    })(Helpers = Snake.Helpers || (Snake.Helpers = {}));
})(Snake || (Snake = {}));
//# sourceMappingURL=eventEmitter.js.map