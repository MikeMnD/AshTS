import MPoint = module("tools/Point");

export class Position {

    public position: MPoint.Point = null;
    public rotation = null;
    public collisionRadius: number = null;

    constructor(x: number, y: number, rotation, collisionRadius: number) {
        this.position = new MPoint.Point(x, y);
        this.rotation = rotation;
        this.collisionRadius = collisionRadius;
    }
}