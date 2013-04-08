var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "core/System", "game/nodes/MotionControl"], function(require, exports, __MSystem__, __MMotionControl__) {
    var MSystem = __MSystem__;

    var MMotionControl = __MMotionControl__;

    var MotionControlSystem = (function (_super) {
        __extends(MotionControlSystem, _super);
        function MotionControlSystem(keyPoll) {
                _super.call(this);
            this.keyPoll = null;
            this.nodeList = null;
            this.initialise(keyPoll);
        }
        MotionControlSystem.prototype.initialise = function (keyPoll) {
            this.keyPoll = keyPoll;
            return this;
        };
        MotionControlSystem.prototype.addToEngine = function (engine) {
            this.nodeList = engine.getNodeList(MMotionControl.MotionControl);
        };
        MotionControlSystem.prototype.removeFromEngine = function (engine) {
            this.nodeList = null;
        };
        MotionControlSystem.prototype.update = function (time) {
            for(var node = this.nodeList.head; node; node = node.next) {
                this.updateNode(node, time);
            }
        };
        MotionControlSystem.prototype.updateNode = function (node, time) {
            var control = node.control;
            var position = node.position;
            var motion = node.motion;
            if(this.keyPoll.isDown(control.left)) {
                position.rotation -= control.rotationRate * time;
            }
            if(this.keyPoll.isDown(control.right)) {
                position.rotation += control.rotationRate * time;
            }
            if(this.keyPoll.isDown(control.accelerate)) {
                motion.velocity.x += Math.cos(position.rotation) * control.accelerationRate * time;
                motion.velocity.y += Math.sin(position.rotation) * control.accelerationRate * time;
            }
        };
        return MotionControlSystem;
    })(MSystem.ash.core.System);
    exports.MotionControlSystem = MotionControlSystem;    
})
//@ sourceMappingURL=MotionControlSystem.js.map
