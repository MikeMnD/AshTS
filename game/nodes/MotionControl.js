var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "core/Node", "game/components/GunControls", "game/components/Position", "game/components/Motion"], function(require, exports, __MNode__, __MGunControls__, __MPosition__, __MMotion__) {
    var MNode = __MNode__;

    var MGunControls = __MGunControls__;

    var MPosition = __MPosition__;

    var MMotion = __MMotion__;

    var MotionControl = (function (_super) {
        __extends(MotionControl, _super);
        function MotionControl() {
                _super.call(this);
            this.control = null;
            this.position = null;
            this.motion = null;
            this.types = {
                control: MGunControls.GunControls,
                position: MPosition.Position,
                motion: MMotion.Motion
            };
        }
        return MotionControl;
    })(MNode.ash.core.Node);
    exports.MotionControl = MotionControl;    
    MotionControl.prototype.control = null;
    MotionControl.prototype.position = null;
    MotionControl.prototype.motion = null;
    MotionControl.prototype.types = {
        control: MGunControls.GunControls,
        position: MPosition.Position,
        motion: MMotion.Motion
    };
})
//@ sourceMappingURL=MotionControl.js.map
