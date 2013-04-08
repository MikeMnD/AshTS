// Interface
export interface IPoint {
    distanceSquaredTo(targetPoint: Point): number;
    distanceTo(targetPoint): number;
}
// Interface
export interface IPoint3D {
    distanceSquaredTo(targetPoint: Point3D): number;
    distanceTo(targetPoint: Point3D): number;
}

// Class
export class Point implements IPoint {

    // Constructor
    constructor(public x: number = 0, public y: number = 0) {

    }

    distanceSquaredTo(targetPoint: Point) {
        var dx = this.x - targetPoint.x,
        dy = this.y - targetPoint.y;
        return dx * dx + dy * dy;
    };
    distanceTo(targetPoint: Point) {
        var dx = this.x - targetPoint.x,
            dy = this.y - targetPoint.y;
        return Math.sqrt(dx * dx + dy * dy);
    };

}

// Class
export class Point3D implements IPoint3D {

    // Constructor
    constructor(public x: number = 0, public y: number = 0, public z: number = 0) {

    }

    distanceSquaredTo(targetPoint: Point3D) {
        var dx = this.x - targetPoint.x,
        dy = this.y - targetPoint.y,
        dz = this.y - targetPoint.z;
        return dx * dx + dy * dy + dz * dz;
    };
    distanceTo(targetPoint: Point3D) {
        var dx = this.x - targetPoint.x,
            dy = this.y - targetPoint.y,
            dz = this.z - targetPoint.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    };

}

