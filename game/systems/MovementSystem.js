var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "core/System", "game/nodes/Movement"], function(require, exports, __MSystem__, __MMovement__) {
    var MSystem = __MSystem__;

    var MMovement = __MMovement__;

    var MovementSystem = (function (_super) {
        __extends(MovementSystem, _super);
        function MovementSystem(gameState) {
                _super.call(this);
            this.gameState = null;
            this.nodeList = null;
            this.initialise = function (gameState) {
                this.gameState = gameState;
                return this;
            };
            this.addToEngine = function (engine) {
                this.nodeList = engine.getNodeList(MMovement.Movement);
            };
            this.removeFromEngine = function (engine) {
                this.nodeList = null;
            };
            this.update = function (time) {
                for(var node = this.nodeList.head; node; node = node.next) {
                    this.updateNode(node, time);
                }
            };
            this.updateNode = function (node, time) {
                var position = node.position;
                var motion = node.motion;
                position.position.x += motion.velocity.x * time;
                position.position.y += motion.velocity.y * time;
                if(position.position.x < 0) {
                    position.position.x += this.gameState.width;
                }
                if(position.position.x > this.gameState.width) {
                    position.position.x -= this.gameState.width;
                }
                if(position.position.y < 0) {
                    position.position.y += this.gameState.height;
                }
                if(position.position.y > this.gameState.height) {
                    position.position.y -= this.gameState.height;
                }
                position.rotation += motion.angularVelocity * time;
                if(motion.damping > 0) {
                    var xDamp = Math.abs(Math.cos(position.rotation) * motion.damping * time);
                    var yDamp = Math.abs(Math.sin(position.rotation) * motion.damping * time);
                    if(motion.velocity.x > xDamp) {
                        motion.velocity.x -= xDamp;
                    } else if(motion.velocity.x < -xDamp) {
                        motion.velocity.x += xDamp;
                    } else {
                        motion.velocity.x = 0;
                    }
                    if(motion.velocity.y > yDamp) {
                        motion.velocity.y -= yDamp;
                    } else if(motion.velocity.y < -yDamp) {
                        motion.velocity.y += yDamp;
                    } else {
                        motion.velocity.y = 0;
                    }
                }
            };
            this.initialise(gameState);
        }
        return MovementSystem;
    })(MSystem.ash.core.System);
    exports.MovementSystem = MovementSystem;    
})
//@ sourceMappingURL=MovementSystem.js.map
