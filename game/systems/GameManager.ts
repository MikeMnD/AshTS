import MSystem = module("core/System");

import MSpaceShipCollision = module("game/nodes/SpaceShipCollision");
import MAsteroidCollision = module("game/nodes/AsteroidCollision");
import MBulletCollision = module("game/nodes/BulletCollision");

import MPoint = module("tools/Point");

export class GameManager extends MSystem.ash.core.System {

    constructor(gameState, creator) {
        super();
        this.initialise(gameState, creator);
    }

    public gameState = null;
    public creator = null;
    public spaceships = null;
    public asteroids = null;
    public bullets = null;

    public initialise(gameState, creator) {
        this.gameState = gameState;
        this.creator = creator;
        return this;
    }

    public addToEngine(game) {
        this.spaceships = game.getNodeList(MSpaceShipCollision.SpaceshipCollision);
        this.asteroids = game.getNodeList(MAsteroidCollision.AsteroidCollision);
        this.bullets = game.getNodeList(MBulletCollision.BulletCollision);
    }

    public update(time) {
        if (this.spaceships.empty()) {
            if (this.gameState.lives > 0) {
                var newSpaceshipPosition = new MPoint.Point(this.gameState.width * 0.5, this.gameState.height * 0.5);
                var clearToAddSpaceship = true;
                for (var asteroid = this.asteroids.head; asteroid; asteroid = asteroid.next) {
                    if (asteroid.position.position.distanceTo(newSpaceshipPosition) <= asteroid.position.collisionRadius + 50) {
                        clearToAddSpaceship = false;
                        break;
                    }
                }
                if (clearToAddSpaceship) {
                    this.creator.createSpaceship();
                    this.gameState.lives--;
                }
            }
            else {
                // game over
            }
        }

        if (this.asteroids.empty() && this.bullets.empty() && !this.spaceships.empty()) {
            // next level
            var spaceship = this.spaceships.head;
            this.gameState.level++;
            var asteroidCount = 2 + this.gameState.level;
            for (var i = 0; i < asteroidCount; ++i) {
                // check not on top of spaceship
                do {
                    var position = new MPoint.Point(
                        Math.random() * this.gameState.width,
                        Math.random() * this.gameState.height
                    );
                }
                while (position.distanceTo(spaceship.position.position) <= 80);
                this.creator.createAsteroid(30, position.x, position.y);
            }
        }
    }

    public removeFromEngine(game) {
        this.spaceships = null;
        this.asteroids = null;
        this.bullets = null;
    }
}
