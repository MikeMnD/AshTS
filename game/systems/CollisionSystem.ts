
import MSystem = module("core/System");

import MSpaceShipCollision = module("game/nodes/SpaceShipCollision");
import MAsteroidCollision = module("game/nodes/AsteroidCollision");
import MBulletCollision = module("game/nodes/BulletCollision");

export class CollisionSystem extends MSystem.ash.core.System {

    constructor(creator) {
        super();
        this.initialise(creator);
    }

    public creator = null;
    public spaceships = null;
    public asteroids = null;
    public bullets = null;

    public initialise(creator) {
        this.creator = creator;
        return this;
    }

    public addToEngine(game) {
        this.spaceships = game.getNodeList(MSpaceShipCollision.SpaceshipCollision);
        this.asteroids = game.getNodeList(MAsteroidCollision.AsteroidCollision);
        this.bullets = game.getNodeList(MBulletCollision.BulletCollision);
    }

    public removeFromEngine(game) {
        this.spaceships = null;
        this.asteroids = null;
        this.bullets = null;
    }

    public update(time) {
        var bullet,
            asteroid,
            spaceship;

        for (bullet = this.bullets.head; bullet; bullet = bullet.next) {
            for (asteroid = this.asteroids.head; asteroid; asteroid = asteroid.next) {
                if (asteroid.position.position.distanceTo(bullet.position.position) <= asteroid.position.collisionRadius) {
                    this.creator.destroyEntity(bullet.entity);
                    if (asteroid.position.collisionRadius > 20) {
                        var pieces;
                        for (pieces = 0; pieces < 8; pieces += 1) {
                            this.creator.createAsteroid(
                                asteroid.position.collisionRadius - 10,
                                asteroid.position.position.x + Math.random() * 10 - 5,
                                asteroid.position.position.y + Math.random() * 10 - 5
                            )
                        }
                    }
                    if (asteroid.position.collisionRadius > 10) {
                        var pieces;
                        for (pieces = 0; pieces < 2; pieces += 1) {
                            this.creator.createAsteroid(
                                asteroid.position.collisionRadius - 10,
                                asteroid.position.position.x + Math.random() * 10 - 5,
                                asteroid.position.position.y + Math.random() * 10 - 5
                            )
                        }

                    }
                    this.creator.destroyEntity(asteroid.entity);
                    break;
                }
            }
        }

        for (spaceship = this.spaceships.head; spaceship; spaceship = spaceship.next) {
            for (asteroid = this.asteroids.head; asteroid; asteroid = asteroid.next) {
                if (asteroid.position.position.distanceTo(spaceship.position.position) <= asteroid.position.collisionRadius + spaceship.position.collisionRadius) {
                    this.creator.destroyEntity(spaceship.entity);
                    break;
                }
            }
        }
    }

}
