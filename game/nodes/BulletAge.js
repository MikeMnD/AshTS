var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "core/Node", "game/components/Bullet"], function(require, exports, __MNode__, __MBullet__) {
    var MNode = __MNode__;

    var MBullet = __MBullet__;

    var BulletAge = (function (_super) {
        __extends(BulletAge, _super);
        function BulletAge() {
                _super.call(this);
            this.bullet = null;
            this.types = {
                bullet: MBullet.Bullet
            };
        }
        return BulletAge;
    })(MNode.ash.core.Node);
    exports.BulletAge = BulletAge;    
    BulletAge.prototype.bullet = null;
    BulletAge.prototype.types = {
        bullet: MBullet.Bullet
    };
})
//@ sourceMappingURL=BulletAge.js.map
