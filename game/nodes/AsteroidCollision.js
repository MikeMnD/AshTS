var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "core/Node", "game/components/Asteroid", "game/components/Position"], function(require, exports, __MNode__, __MAsteroid__, __MPosition__) {
    var MNode = __MNode__;

    var MAsteroid = __MAsteroid__;

    var MPosition = __MPosition__;

    var AsteroidCollision = (function (_super) {
        __extends(AsteroidCollision, _super);
        function AsteroidCollision() {
                _super.call(this);
            this.asteroid = null;
            this.position = null;
            this.types = {
                asteroid: MAsteroid.Asteroid,
                position: MPosition.Position
            };
        }
        return AsteroidCollision;
    })(MNode.ash.core.Node);
    exports.AsteroidCollision = AsteroidCollision;    
    AsteroidCollision.prototype.asteroid = null;
    AsteroidCollision.prototype.position = null;
    AsteroidCollision.prototype.types = {
        asteroid: MAsteroid.Asteroid,
        position: MPosition.Position
    };
})
//@ sourceMappingURL=AsteroidCollision.js.map
