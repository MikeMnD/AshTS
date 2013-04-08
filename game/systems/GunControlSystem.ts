
import MSystem = module("core/System");

import MGunControl = module("game/nodes/GunControl");

export class GunControlSystem extends MSystem.ash.core.System {

    constructor(keyPoll, creator) {
        super();
        this.initialise(keyPoll, creator);
    }

    public keyPoll = null;
    public creator = null;
    public nodeList = null;
    public initialise(keyPoll, creator) {
        this.keyPoll = keyPoll;
        this.creator = creator;
        return this;
    }

    public addToEngine(engine) {
        this.nodeList = engine.getNodeList(MGunControl.GunControl);
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
        var control = node.control,
            position = node.position,
            gun = node.gun;

        gun.shooting = this.keyPoll.isDown(control.trigger);
        gun.timeSinceLastShot += time;
        if (gun.shooting && gun.timeSinceLastShot >= gun.minimumShotInterval) {
            this.creator.createUserBullet(gun, position);
            gun.timeSinceLastShot = 0;
        }
    }

}