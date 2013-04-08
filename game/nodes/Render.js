var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "core/Node", "game/components/Position", "game/components/Display"], function(require, exports, __MNode__, __MPosition__, __MDisplay__) {
    var MNode = __MNode__;

    var MPosition = __MPosition__;

    var MDisplay = __MDisplay__;

    var Render = (function (_super) {
        __extends(Render, _super);
        function Render() {
                _super.call(this);
            this.position = null;
            this.display = null;
            this.types = {
                position: MPosition.Position,
                motion: MDisplay.Display
            };
        }
        return Render;
    })(MNode.ash.core.Node);
    exports.Render = Render;    
    Render.prototype.position = null;
    Render.prototype.display = null;
    Render.prototype.types = {
        position: MPosition.Position,
        motion: MDisplay.Display
    };
})
//@ sourceMappingURL=Render.js.map
