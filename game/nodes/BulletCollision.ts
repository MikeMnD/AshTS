import MNode = module("core/Node");

import MBullet = module("game/components/Bullet");
import MPosition = module("game/components/Position");

export class BulletCollision extends MNode.ash.core.Node {

    public bullet = null;
    public position: any;

    public types: any;

    constructor() {
        super();
        this.types = {
            bullet: MBullet.Bullet,
            position: MPosition.Position
        }
    }

}

//i hope there is a better way :)
BulletCollision.prototype.bullet = null;
BulletCollision.prototype.position = null;
BulletCollision.prototype.types = {
    bullet: MBullet.Bullet,
    position: MPosition.Position
}