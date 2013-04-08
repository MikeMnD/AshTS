
//core
import MEntity = module("core/Entity");

//tools
import MKeyPoll = module("tools/KeyPoll");


//game components
import MAsteroid = module("game/components/Asteroid");
import MSpaceship = module("game/components/Spaceship");
import MBullet = module("game/components/Bullet");
import MPosition = module("game/components/Position");
import MMotion = module("game/components/Motion");
import MMotionControls = module("game/components/MotionControls");
import MGun = module("game/components/Gun");
import MGunControls = module("game/components/GunControls");
import MDisplay = module("game/components/Display");

//graphics
import MAsteroidView = module("game/graphics/AsteroidView");
import MSpaceshipView = module("game/graphics/SpaceshipView");
import MBulletView = module("game/graphics/BulletView");



export class EntityCreator {

    public game = null;
    public graphics = null;

    constructor(game, graphics) {
        this.initialise(game, graphics);
    }

    public initialise(game, graphics) {
        this.game = game;
        this.graphics = graphics;
        return this;
    };

    public destroyEntity(entity) {
        this.game.removeEntity(entity);
    };

    public createAsteroid(radius, x, y) {
        var asteroid = new MEntity.ash.core.Entity()
            .add(new MAsteroid.Asteroid())
            .add(new MPosition.Position(x, y, 0, radius))
            .add(
                new MMotion.Motion(
                    (Math.random() - 0.5) * 4 * (50 - radius),
                    (Math.random() - 0.5) * 4 * (50 - radius),
                    Math.random() * 2 - 1,
                    0
                )
            )
            .add(new MDisplay.Display(new MAsteroidView.AsteroidView(radius, this.graphics)));
        this.game.addEntity(asteroid);
        return asteroid;
    };

    public createSpaceship() {
        var spaceship = new MEntity.ash.core.Entity()
            .add(new MSpaceship.Spaceship())
            .add(new MPosition.Position(400, 300, 1, 6))
            .add(new MMotion.Motion(0, 0, 0, 15))
            .add(
            new MMotionControls.MotionControls(
                    MKeyPoll.Keyboard.keyboard.LEFT,
                     MKeyPoll.Keyboard.keyboard.RIGHT,
                    MKeyPoll.Keyboard.keyboard.UP,
                    100,
                    3
                )
            )
            .add(new MGun.Gun(8, 0, 0.3, 2))
            .add(new MGunControls.GunControls(MKeyPoll.Keyboard.keyboard.Z))
            .add(new MDisplay.Display(new MSpaceshipView.SpaceshipView(this.graphics)));
        this.game.addEntity(spaceship);
        return spaceship;
    };

    public createUserBullet(gun, parentPosition) {
        var cos = Math.cos(parentPosition.rotation);
        var sin = Math.sin(parentPosition.rotation);
        var bullet = new MEntity.ash.core.Entity()
            .add(new MBullet.Bullet(gun.bulletLifetime))
            .add(new MPosition.Position(
                cos * gun.offsetFromParent.x - sin * gun.offsetFromParent.y + parentPosition.position.x,
                sin * gun.offsetFromParent.x + cos * gun.offsetFromParent.y + parentPosition.position.y, 0, 0))
            .add(new MMotion.Motion(cos * 150, sin * 150, 0, 0))
            .add(new MDisplay.Display(new MBulletView.BulletView(this.graphics)));
        this.game.addEntity(bullet);
        return bullet;
    };
}