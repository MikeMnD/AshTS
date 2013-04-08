
import MSystem = module("core/System");

import MMotionControl = module("game/nodes/MotionControl");

export class MotionControlSystem extends MSystem.ash.core.System {

    constructor(keyPoll) {
        super();
        this.initialise(keyPoll);
    }

    public keyPoll = null;
    public nodeList = null;

    public initialise(keyPoll) {
        this.keyPoll = keyPoll;
        return this;
    }

    public addToEngine(engine) {
        this.nodeList = engine.getNodeList(MMotionControl.MotionControl);
    }

    public removeFromEngine(engine) {
        this.nodeList = null;
    }

    public update(time) {
        for (var node = this.nodeList.head; node; node = node.next) {
            this.updateNode(node, time);
        }
    }

    public updateNode(node, time) {
        var control = node.control;
        var position = node.position;
        var motion = node.motion;

        if (this.keyPoll.isDown(control.left)) {
            position.rotation -= control.rotationRate * time;
        }
        if (this.keyPoll.isDown(control.right)) {
            position.rotation += control.rotationRate * time;
        }
        if (this.keyPoll.isDown(control.accelerate)) {
            motion.velocity.x += Math.cos(position.rotation) * control.accelerationRate * time;
            motion.velocity.y += Math.sin(position.rotation) * control.accelerationRate * time;
        }
    }

}
