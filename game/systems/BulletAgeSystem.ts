
import MSystem = module("core/System");

import MBulletAge = module("game/nodes/BulletAge");

export class BulletAgeSystem extends MSystem.ash.core.System {

    constructor(creator) {
        super();
        this.initialise(creator);
    }

    creator = null;
    nodeList = null;

    initialise(creator) {
        this.creator = creator;
        return this;
    }

    addToEngine(engine) {
        this.nodeList = engine.getNodeList(MBulletAge.BulletAge);
    }

    removeFromEngine(engine) {
        this.nodeList = null;
    }

    update(time) {
        for (var node = this.nodeList.head; node; node = node.next) {
            this.updateNode(node, time);
        }
    }

    updateNode(node, time) {
        var bullet = node.bullet;
        bullet.lifeRemaining -= time;
        if (bullet.lifeRemaining <= 0) {
            this.creator.destroyEntity(node.entity);
        }
    }

}


