define(["require", "exports"], function(require, exports) {
    var SpaceshipView = (function () {
        function SpaceshipView(graphics) {
            this.x = 0;
            this.y = 0;
            this.width = 20;
            this.height = 20;
            this.rotation = 0;
            this.graphics = null;
            this.initialise(graphics);
        }
        SpaceshipView.prototype.initialise = function (graphics) {
            this.graphics = graphics;
            this.draw();
            return this;
        };
        SpaceshipView.prototype.draw = function () {
            var graphics = this.graphics;
            graphics.save();
            graphics.beginPath();
            graphics.translate(this.x, this.y);
            graphics.rotate(this.rotation);
            graphics.fillStyle = "#FFFFFF";
            graphics.moveTo(8, 0);
            graphics.lineTo(-7, 7);
            graphics.lineTo(-4, 0);
            graphics.lineTo(-7, -7);
            graphics.lineTo(10, 0);
            graphics.fill();
            graphics.restore();
        };
        return SpaceshipView;
    })();
    exports.SpaceshipView = SpaceshipView;    
})
//@ sourceMappingURL=SpaceshipView.js.map
