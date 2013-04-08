define(["require", "exports"], function(require, exports) {
    
    (function (ash) {
        (function (core) {
            var Node = (function () {
                function Node() {
                    this.entity = null;
                    this.previous = null;
                    this.next = null;
                }
                return Node;
            })();
            core.Node = Node;            
        })(ash.core || (ash.core = {}));
        var core = ash.core;
    })(exports.ash || (exports.ash = {}));
    var ash = exports.ash;
})
//@ sourceMappingURL=Node.js.map
