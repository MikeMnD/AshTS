
import MEntityCreator = module("game/EntityCreator");

//game components
import MGameState = module("game/components/GameState");

//game systems
import MGameManager = module("game/systems/GameManager");
import MMotionControlSystem = module("game/systems/MotionControlSystem");
import MGunControlSystem = module("game/systems/GunControlSystem");
import MBulletAgeSystem = module("game/systems/BulletAgeSystem");
import MMovementSystem = module("game/systems/MovementSystem");
import MCollisionSystem = module("game/systems/CollisionSystem");
import MRenderSystem = module("game/systems/RenderSystem");
import MSystemPriorities = module("game/systems/SystemPriorities");

//core
import MEngine = module("core/Engine");
import MSystem = module("core/System");


//tools
import MDictionary = module("tools/Dictionary");
import MSignal = module("tools/Signal");
import MTickProvider = module("tools/TickProvider");
import MKeyPoll = module("tools/KeyPoll");



export class Asteroids {

    public width = 0;
    public height = 0;
    public engine = null;
    public gameState = null;
    public tickProvider = null;

    initialise(canvas) {
        var canvasContext = canvas.getContext("2d");

        this.width = canvas.width;
        this.height = canvas.height;

        this.engine = new MEngine.ash.core.Engine();

        this.gameState = new MGameState.GameState(this.width, this.height);

        var keyPoll = new MKeyPoll.Keypoll();
        var creator = new MEntityCreator.EntityCreator(this.engine, canvasContext);

        this.engine.addSystem(
            new MGameManager.GameManager(this.gameState, creator),
            MSystemPriorities.SystemPriorities.preUpdate
        );
        this.engine.addSystem(
            new MMotionControlSystem.MotionControlSystem(keyPoll),
            MSystemPriorities.SystemPriorities.update
        );
        this.engine.addSystem(
            new MGunControlSystem.GunControlSystem(keyPoll, creator),
            MSystemPriorities.SystemPriorities.update
        );
        this.engine.addSystem(
            new MBulletAgeSystem.BulletAgeSystem(creator),
             MSystemPriorities.SystemPriorities.update
        );
        this.engine.addSystem(
            new MMovementSystem.MovementSystem(this.gameState),
             MSystemPriorities.SystemPriorities.move
        );
        this.engine.addSystem(
            new MCollisionSystem.CollisionSystem(creator),
             MSystemPriorities.SystemPriorities.resolveCollisions
        );
        this.engine.addSystem(
            new MRenderSystem.RenderSystem(canvasContext),
             MSystemPriorities.SystemPriorities.render
        );
        this.tickProvider = new MTickProvider.TickProvider();
    };

    start() {
        this.gameState.level = 0;
        this.gameState.lives = 3;
        this.gameState.points = 0;

        this.tickProvider.add(this.engine.update, this.engine);
        this.tickProvider.start();
    };

}
