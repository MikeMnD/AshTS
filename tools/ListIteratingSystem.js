var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ash;
(function (ash) {
    (function (tools) {
        var ListIteratingSystem = (function (_super) {
            __extends(ListIteratingSystem, _super);
            function ListIteratingSystem() {
                _super.apply(this, arguments);

            }
            ListIteratingSystem.prototype.ListIteratingSystem = function (nodeClass, nodeUpdateFunction, nodeAddedFunction, nodeRemovedFunction) {
                if (typeof nodeAddedFunction === "undefined") { nodeAddedFunction = null; }
                if (typeof nodeRemovedFunction === "undefined") { nodeRemovedFunction = null; }
                this.nodeClass = nodeClass;
                this.nodeUpdateFunction = nodeUpdateFunction;
                this.nodeAddedFunction = nodeAddedFunction;
                this.nodeRemovedFunction = nodeRemovedFunction;
            };
            ListIteratingSystem.prototype.addToEngine = function (engine) {
                nodeList = engine.getNodeList(nodeClass);
                if(nodeAddedFunction != null) {
                    for(var node = nodeList.head; node; node = node.next) {
                        nodeAddedFunction(node);
                    }
                    nodeList.nodeAdded.add(nodeAddedFunction);
                }
                if(nodeRemovedFunction != null) {
                    nodeList.nodeRemoved.add(nodeRemovedFunction);
                }
            };
            ListIteratingSystem.prototype.removeFromEngine = function (engine) {
                if(nodeAddedFunction != null) {
                    nodeList.nodeAdded.remove(nodeAddedFunction);
                }
                if(nodeRemovedFunction != null) {
                    nodeList.nodeRemoved.remove(nodeRemovedFunction);
                }
                nodeList = null;
            };
            ListIteratingSystem.prototype.update = function (time) {
                for(var node = nodeList.head; node; node = node.next) {
                    nodeUpdateFunction(node, time);
                }
            };
            return ListIteratingSystem;
        })(System);
        tools.ListIteratingSystem = ListIteratingSystem;        
    })(ash.tools || (ash.tools = {}));
    var tools = ash.tools;
})(ash || (ash = {}));
//@ sourceMappingURL=ListIteratingSystem.js.map
