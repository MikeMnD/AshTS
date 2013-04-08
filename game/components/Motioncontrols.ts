import MPoint = module("tools/Point");

export class MotionControls {

    public left = null;
    public right = null;
    public accelerate = null;
    public accelerationRate = null;
    public rotationRate = null;

    constructor(left, right, accelerate, accelerationRate, rotationRate) {
        this.left = left;
        this.right = right;
        this.accelerate = accelerate;
        this.accelerationRate = accelerationRate;
        this.rotationRate = rotationRate;
    }
}