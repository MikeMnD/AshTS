define(["require", "exports", "core/Node"], function(require, exports, __MNode__) {
    var MNode = __MNode__;

    (function (ash) {
        (function (core) {
            var NodePool = (function () {
                function NodePool(nodeClass) {
                    this._nodeClass = nodeClass;
                }
                NodePool.prototype.get = function () {
                    if(this._tail) {
                        var node = this._tail;
                        this._tail = this._tail.previous;
                        node.previous = null;
                        return node;
                    } else {
                        return new MNode.ash.core.Node();
                    }
                };
                NodePool.prototype.dispose = function (node) {
                    node.next = null;
                    node.previous = this._tail;
                    this._tail = node;
                };
                NodePool.prototype.cache = function (node) {
                    node.previous = this._cacheTail;
                    this._cacheTail = node;
                };
                NodePool.prototype.releaseCache = function () {
                    while(this._cacheTail) {
                        var node = this._cacheTail;
                        this._cacheTail = node.previous;
                        node.next = null;
                        node.previous = this._tail;
                        this._tail = node;
                    }
                };
                return NodePool;
            })();
            core.NodePool = NodePool;            
        })(ash.core || (ash.core = {}));
        var core = ash.core;
    })(exports.ash || (exports.ash = {}));
    var ash = exports.ash;
})
//@ sourceMappingURL=NodePool.js.map
