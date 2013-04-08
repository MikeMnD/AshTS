var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "core/System", "game/nodes/SpaceShipCollision", "game/nodes/AsteroidCollision", "game/nodes/BulletCollision", "tools/Point"], function(require, exports, __MSystem__, __MSpaceShipCollision__, __MAsteroidCollision__, __MBulletCollision__, __MPoint__) {
    var MSystem = __MSystem__;

    var MSpaceShipCollision = __MSpaceShipCollision__;

    var MAsteroidCollision = __MAsteroidCollision__;

    var MBulletCollision = __MBulletCollision__;

    var MPoint = __MPoint__;

    var GameManager = (function (_super) {
        __extends(GameManager, _super);
        function GameManager(gameState, creator) {
                _super.call(this);
            this.gameState = null;
            this.creator = null;
            this.spaceships = null;
            this.asteroids = null;
            this.bullets = null;
            this.initialise(gameState, creator);
        }
        GameManager.prototype.initialise = function (gameState, creator) {
            this.gameState = gameState;
            this.creator = creator;
            return this;
        };
        GameManager.prototype.addToEngine = function (game) {
            this.spaceships = game.getNodeList(MSpaceShipCollision.SpaceshipCollision);
            this.asteroids = game.getNodeList(MAsteroidCollision.AsteroidCollision);
            this.bullets = game.getNodeList(MBulletCollision.BulletCollision);
        };
        GameManager.prototype.update = function (time) {
            if(this.spaceships.empty()) {
                if(this.gameState.lives > 0) {
                    var newSpaceshipPosition = new MPoint.Point(this.gameState.width * 0.5, this.gameState.height * 0.5);
                    var clearToAddSpaceship = true;
                    for(var asteroid = this.asteroids.head; asteroid; asteroid = asteroid.next) {
                        if(asteroid.position.position.distanceTo(newSpaceshipPosition) <= asteroid.position.collisionRadius + 50) {
                            clearToAddSpaceship = false;
                            break;
                        }
                    }
                    if(clearToAddSpaceship) {
                        this.creator.createSpaceship();
                        this.gameState.lives--;
                    }
                } else {
                }
            }
            if(this.asteroids.empty() && this.bullets.empty() && !this.spaceships.empty()) {
                var spaceship = this.spaceships.head;
                this.gameState.level++;
                var asteroidCount = 2 + this.gameState.level;
                for(var i = 0; i < asteroidCount; ++i) {
                    do {
                        var position = new MPoint.Point(Math.random() * this.gameState.width, Math.random() * this.gameState.height);
                    }while(position.distanceTo(spaceship.position.position) <= 80);
                    this.creator.createAsteroid(30, position.x, position.y);
                }
            }
        };
        GameManager.prototype.removeFromEngine = function (game) {
            this.spaceships = null;
            this.asteroids = null;
            this.bullets = null;
        };
        return GameManager;
    })(MSystem.ash.core.System);
    exports.GameManager = GameManager;    
})
//@ sourceMappingURL=GameManager.js.map
