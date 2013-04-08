define(["require", "exports"], function(require, exports) {
    var Point = (function () {
        function Point(x, y) {
            if (typeof x === "undefined") { x = 0; }
            if (typeof y === "undefined") { y = 0; }
            this.x = x;
            this.y = y;
        }
        Point.prototype.distanceSquaredTo = function (targetPoint) {
            var dx = this.x - targetPoint.x, dy = this.y - targetPoint.y;
            return dx * dx + dy * dy;
        };
        Point.prototype.distanceTo = function (targetPoint) {
            var dx = this.x - targetPoint.x, dy = this.y - targetPoint.y;
            return Math.sqrt(dx * dx + dy * dy);
        };
        return Point;
    })();
    exports.Point = Point;    
    var Point3D = (function () {
        function Point3D(x, y, z) {
            if (typeof x === "undefined") { x = 0; }
            if (typeof y === "undefined") { y = 0; }
            if (typeof z === "undefined") { z = 0; }
            this.x = x;
            this.y = y;
            this.z = z;
        }
        Point3D.prototype.distanceSquaredTo = function (targetPoint) {
            var dx = this.x - targetPoint.x, dy = this.y - targetPoint.y, dz = this.y - targetPoint.z;
            return dx * dx + dy * dy + dz * dz;
        };
        Point3D.prototype.distanceTo = function (targetPoint) {
            var dx = this.x - targetPoint.x, dy = this.y - targetPoint.y, dz = this.z - targetPoint.z;
            return Math.sqrt(dx * dx + dy * dy + dz * dz);
        };
        return Point3D;
    })();
    exports.Point3D = Point3D;    
})
//@ sourceMappingURL=Point.js.map
