import MPoint = module("tools/Point");

export class Gun {

    public shooting: bool = false;
    public timeSinceLastShot: number = 0;
    public offsetFromParent: MPoint.Point = null;
    public minimumShotInterval: number;
    public bulletLifetime: number;

    constructor(offsetX, offsetY, minimumShotInterval, bulletLifetime) {

        this.offsetFromParent = new MPoint.Point( offsetX, offsetY );
        this.minimumShotInterval = minimumShotInterval;
        this.bulletLifetime = bulletLifetime;
    }
}