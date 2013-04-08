define(["require", "exports", "tools/Point"], function(require, exports, __MPoint__) {
    var MPoint = __MPoint__;

    var Motion = (function () {
        function Motion(velocityX, velocityY, angularVelocity, damping) {
            this.velocity = null;
            this.angularVelocity = angularVelocity;
            this.damping = damping;
            this.velocity = new MPoint.Point(velocityX, velocityY);
            this.angularVelocity = angularVelocity;
            this.damping = damping;
        }
        return Motion;
    })();
    exports.Motion = Motion;    
})
//@ sourceMappingURL=Motion.js.map
