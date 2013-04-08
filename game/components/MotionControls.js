define(["require", "exports"], function(require, exports) {
    
    var MotionControls = (function () {
        function MotionControls(left, right, accelerate, accelerationRate, rotationRate) {
            this.left = null;
            this.right = null;
            this.accelerate = null;
            this.accelerationRate = null;
            this.rotationRate = null;
            this.left = left;
            this.right = right;
            this.accelerate = accelerate;
            this.accelerationRate = accelerationRate;
            this.rotationRate = rotationRate;
        }
        return MotionControls;
    })();
    exports.MotionControls = MotionControls;    
})
//@ sourceMappingURL=MotionControls.js.map
