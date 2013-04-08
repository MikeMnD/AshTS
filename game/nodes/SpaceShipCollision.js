var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "core/Node", "game/components/Spaceship", "game/components/Position"], function(require, exports, __MNode__, __MSpaceship__, __MPosition__) {
    var MNode = __MNode__;

    var MSpaceship = __MSpaceship__;

    var MPosition = __MPosition__;

    var SpaceshipCollision = (function (_super) {
        __extends(SpaceshipCollision, _super);
        function SpaceshipCollision() {
                _super.call(this);
            this.spaceship = null;
            this.position = null;
            this.types = {
                spaceship: MSpaceship.Spaceship,
                position: MPosition.Position
            };
        }
        return SpaceshipCollision;
    })(MNode.ash.core.Node);
    exports.SpaceshipCollision = SpaceshipCollision;    
    SpaceshipCollision.prototype.spaceship = null;
    SpaceshipCollision.prototype.position = null;
    SpaceshipCollision.prototype.types = {
        spaceship: MSpaceship.Spaceship,
        position: MPosition.Position
    };
})
//@ sourceMappingURL=SpaceshipCollision.js.map
