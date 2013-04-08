import MNode = module("core/Node");

import MGunControls = module("game/components/GunControls");
import MGun = module("game/components/Gun");
import MPosition = module("game/components/Position");

export class GunControl extends MNode.ash.core.Node {

    public control = null;
    public gun = null;
    public position = null;

    public types: any;

    constructor() {
        super();
        this.types = {
            control: MGunControls.GunControls,
            gun: MGun.Gun,
            position: MPosition.Position
        }
    }

}

//i hope there is a better way :)
GunControl.prototype.control = null;
GunControl.prototype.gun = null;
GunControl.prototype.position = null;
GunControl.prototype.types = {
    control: MGunControls.GunControls,
    gun: MGun.Gun,
    position: MPosition.Position
}