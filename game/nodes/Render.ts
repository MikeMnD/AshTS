import MNode = module("core/Node");

import MPosition = module("game/components/Position");
import MDisplay = module("game/components/Display");

export class Render extends MNode.ash.core.Node {

    public position = null;
    public display = null;

    public types: any;

    constructor() {
        super();
        this.types = {
            position: MPosition.Position,
            motion: MDisplay.Display
        }
    }

}


//i hope there is a better way :)
Render.prototype.position = null;
Render.prototype.display = null;
Render.prototype.types = {
    position: MPosition.Position,
    motion: MDisplay.Display
}