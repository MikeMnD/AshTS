define(["require", "exports", "tools/Point"], function(require, exports, __MPoint__) {
    var MPoint = __MPoint__;

    var Gun = (function () {
        function Gun(offsetX, offsetY, minimumShotInterval, bulletLifetime) {
            this.shooting = false;
            this.timeSinceLastShot = 0;
            this.offsetFromParent = null;
            this.offsetFromParent = new MPoint.Point(offsetX, offsetY);
            this.minimumShotInterval = minimumShotInterval;
            this.bulletLifetime = bulletLifetime;
        }
        return Gun;
    })();
    exports.Gun = Gun;    
})
//@ sourceMappingURL=Gun.js.map
