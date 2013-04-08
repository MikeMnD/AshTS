define(["require", "exports"], function(require, exports) {
    
    (function (ash) {
        (function (core) {
            var System = (function () {
                function System() {
                    this.previous = null;
                    this.next = null;
                    this.priority = 0;
                }
                System.prototype.addToEngine = function (engine) {
                };
                System.prototype.removeFromEngine = function (engine) {
                };
                System.prototype.update = function (time) {
                };
                System.prototype.is = function (type) {
                    return type.prototype.isPrototypeOf(this);
                };
                return System;
            })();
            core.System = System;            
        })(ash.core || (ash.core = {}));
        var core = ash.core;
    })(exports.ash || (exports.ash = {}));
    var ash = exports.ash;
    ash.core.System.prototype.previous = null;
    ash.core.System.prototype.next = null;
    ash.core.System.prototype.priority = 0;
})
//@ sourceMappingURL=System.js.map
