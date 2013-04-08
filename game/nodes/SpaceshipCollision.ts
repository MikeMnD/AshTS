import MNode = module("core/Node");

import MSpaceship = module("game/components/Spaceship");
import MPosition = module("game/components/Position");

export class SpaceshipCollision extends MNode.ash.core.Node {

    public spaceship = null;
    public position = null;

    public types: any = {
        spaceship: MSpaceship.Spaceship,
        position: MPosition.Position
    }

    constructor() {
        super();
    }

}

//i hope there is a better way :)
SpaceshipCollision.prototype.spaceship = null;
SpaceshipCollision.prototype.position = null;
SpaceshipCollision.prototype.types = {
    spaceship: MSpaceship.Spaceship,
    position: MPosition.Position
}