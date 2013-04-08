var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "core/Node", "game/components/Bullet", "game/components/Position"], function(require, exports, __MNode__, __MBullet__, __MPosition__) {
    var MNode = __MNode__;

    var MBullet = __MBullet__;

    var MPosition = __MPosition__;

    var BulletCollision = (function (_super) {
        __extends(BulletCollision, _super);
        function BulletCollision() {
                _super.call(this);
            this.bullet = null;
            this.types = {
                bullet: MBullet.Bullet,
                position: MPosition.Position
            };
        }
        return BulletCollision;
    })(MNode.ash.core.Node);
    exports.BulletCollision = BulletCollision;    
    BulletCollision.prototype.bullet = null;
    BulletCollision.prototype.position = null;
    BulletCollision.prototype.types = {
        bullet: MBullet.Bullet,
        position: MPosition.Position
    };
})
//@ sourceMappingURL=BulletCollision.js.map
