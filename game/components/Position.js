define(["require", "exports", "tools/Point"], function(require, exports, __MPoint__) {
    var MPoint = __MPoint__;

    var Position = (function () {
        function Position(x, y, rotation, collisionRadius) {
            this.position = null;
            this.rotation = null;
            this.collisionRadius = null;
            this.position = new MPoint.Point(x, y);
            this.rotation = rotation;
            this.collisionRadius = collisionRadius;
        }
        return Position;
    })();
    exports.Position = Position;    
})
//@ sourceMappingURL=Position.js.map
