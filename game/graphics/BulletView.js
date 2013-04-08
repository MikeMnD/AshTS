define(["require", "exports"], function(require, exports) {
    var BulletView = (function () {
        function BulletView(graphics) {
            this.x = 0;
            this.y = 0;
            this.width = 4;
            this.height = 4;
            this.rotation = 0;
            this.graphics = null;
            this.initialise(graphics);
        }
        BulletView.prototype.initialise = function (graphics) {
            this.graphics = graphics;
            this.draw();
            return this;
        };
        BulletView.prototype.draw = function () {
            var graphics = this.graphics;
            graphics.save();
            graphics.rotate(this.rotation);
            graphics.beginPath();
            graphics.fillStyle = "#FFFFFF";
            graphics.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
            graphics.fill();
            graphics.restore();
        };
        return BulletView;
    })();
    exports.BulletView = BulletView;    
})
//@ sourceMappingURL=BulletView.js.map
