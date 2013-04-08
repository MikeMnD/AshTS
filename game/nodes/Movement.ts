import MNode = module("core/Node");

import MPosition = module("game/components/Position");
import MMotion = module("game/components/Motion");

export class Movement extends MNode.ash.core.Node {

    public control = null;
    public position = null;

    public types: any;

    constructor() {
        super();
        this.types = {
            position: MPosition.Position,
            motion: MMotion.Motion
        }
    }

}

//i hope there is a better way :)
Movement.prototype.control = null;
Movement.prototype.position = null;
Movement.prototype.types = {
    position: MPosition.Position,
    motion: MMotion.Motion
}