define(["require", "exports"], function(require, exports) {
    var GameState = (function () {
        function GameState(width, height) {
            this.lives = 0;
            this.level = 0;
            this.points = 0;
            this.width = null;
            this.height = null;
            this.width = width;
            this.height = height;
        }
        return GameState;
    })();
    exports.GameState = GameState;    
})
//@ sourceMappingURL=GameState.js.map
