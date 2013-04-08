import MPoint = module("tools/Point");

export class Motion {

    public velocity: MPoint.Point = null;
    public angularVelocity = angularVelocity;
    public damping = damping;

    constructor(velocityX, velocityY, angularVelocity, damping) {
        this.velocity = new MPoint.Point(velocityX, velocityY);
        this.angularVelocity = angularVelocity;
        this.damping = damping;
    }
}