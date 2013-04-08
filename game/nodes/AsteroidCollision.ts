import MNode = module("core/Node");

import MAsteroid = module("game/components/Asteroid");
import MPosition = module("game/components/Position");

export class AsteroidCollision extends MNode.ash.core.Node {

    public asteroid = null;
    public position = null;

    public types: any;

    constructor() {
        super();
        this.types = {
            asteroid: MAsteroid.Asteroid,
            position: MPosition.Position
        }
    }

}

//i hope there is a better way :)
AsteroidCollision.prototype.asteroid = null;
AsteroidCollision.prototype.position = null;
AsteroidCollision.prototype.types = {
    asteroid: MAsteroid.Asteroid,
    position: MPosition.Position
}