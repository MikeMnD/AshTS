var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "core/System", "game/nodes/BulletAge"], function(require, exports, __MSystem__, __MBulletAge__) {
    var MSystem = __MSystem__;

    var MBulletAge = __MBulletAge__;

    var BulletAgeSystem = (function (_super) {
        __extends(BulletAgeSystem, _super);
        function BulletAgeSystem(creator) {
                _super.call(this);
            this.creator = null;
            this.nodeList = null;
            this.initialise(creator);
        }
        BulletAgeSystem.prototype.initialise = function (creator) {
            this.creator = creator;
            return this;
        };
        BulletAgeSystem.prototype.addToEngine = function (engine) {
            this.nodeList = engine.getNodeList(MBulletAge.BulletAge);
        };
        BulletAgeSystem.prototype.removeFromEngine = function (engine) {
            this.nodeList = null;
        };
        BulletAgeSystem.prototype.update = function (time) {
            for(var node = this.nodeList.head; node; node = node.next) {
                this.updateNode(node, time);
            }
        };
        BulletAgeSystem.prototype.updateNode = function (node, time) {
            var bullet = node.bullet;
            bullet.lifeRemaining -= time;
            if(bullet.lifeRemaining <= 0) {
                this.creator.destroyEntity(node.entity);
            }
        };
        return BulletAgeSystem;
    })(MSystem.ash.core.System);
    exports.BulletAgeSystem = BulletAgeSystem;    
})
//@ sourceMappingURL=BulletAgeSystem.js.map
