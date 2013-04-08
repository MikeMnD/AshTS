var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "core/Node", "game/components/Position", "game/components/Motion"], function(require, exports, __MNode__, __MPosition__, __MMotion__) {
    var MNode = __MNode__;

    var MPosition = __MPosition__;

    var MMotion = __MMotion__;

    var Movement = (function (_super) {
        __extends(Movement, _super);
        function Movement() {
                _super.call(this);
            this.control = null;
            this.position = null;
            this.types = {
                position: MPosition.Position,
                motion: MMotion.Motion
            };
        }
        return Movement;
    })(MNode.ash.core.Node);
    exports.Movement = Movement;    
    Movement.prototype.control = null;
    Movement.prototype.position = null;
    Movement.prototype.types = {
        position: MPosition.Position,
        motion: MMotion.Motion
    };
})
//@ sourceMappingURL=Movement.js.map
