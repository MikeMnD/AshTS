import MNode = module("core/Node");

import MGunControls = module("game/components/GunControls");
import MPosition = module("game/components/Position");
import MMotion = module("game/components/Motion");

export class MotionControl extends MNode.ash.core.Node {

    public control = null;
    public position = null;
    public motion = null;

    public types: any;

    constructor() {
        super();
        this.types = {
            control: MGunControls.GunControls,
            position: MPosition.Position,
            motion: MMotion.Motion
        }
    }

}

//i hope there is a better way :)
MotionControl.prototype.control = null;
MotionControl.prototype.position = null;
MotionControl.prototype.motion = null;
MotionControl.prototype.types = {
    control: MGunControls.GunControls,
    position: MPosition.Position,
    motion: MMotion.Motion
}