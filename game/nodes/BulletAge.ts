import MNode = module("core/Node");

import MBullet = module("game/components/Bullet");

export class BulletAge extends MNode.ash.core.Node {

    public bullet = null;

    public types: any;

    constructor() {
        super();
        this.types = {
            bullet: MBullet.Bullet
        }
    }

}

//i hope there is a better way :)
BulletAge.prototype.bullet = null;
BulletAge.prototype.types = {
    bullet: MBullet.Bullet
}