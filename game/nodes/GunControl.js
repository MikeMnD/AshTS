var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "core/Node", "game/components/GunControls", "game/components/Gun", "game/components/Position"], function(require, exports, __MNode__, __MGunControls__, __MGun__, __MPosition__) {
    var MNode = __MNode__;

    var MGunControls = __MGunControls__;

    var MGun = __MGun__;

    var MPosition = __MPosition__;

    var GunControl = (function (_super) {
        __extends(GunControl, _super);
        function GunControl() {
                _super.call(this);
            this.control = null;
            this.gun = null;
            this.position = null;
            this.types = {
                control: MGunControls.GunControls,
                gun: MGun.Gun,
                position: MPosition.Position
            };
        }
        return GunControl;
    })(MNode.ash.core.Node);
    exports.GunControl = GunControl;    
    GunControl.prototype.control = null;
    GunControl.prototype.gun = null;
    GunControl.prototype.position = null;
    GunControl.prototype.types = {
        control: MGunControls.GunControls,
        gun: MGun.Gun,
        position: MPosition.Position
    };
})
//@ sourceMappingURL=GunControl.js.map
