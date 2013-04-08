export class BulletView {

    public x: number = 0;
    public y: number = 0;
    public width: number = 4;
    public height: number = 4;
    public rotation: number = 0;
    public graphics = null;

    constructor(graphics) {
        this.initialise(graphics);
    }

    public initialise(graphics) {
        this.graphics = graphics;
        this.draw();
        return this;
    }

	public draw() {
        var graphics = this.graphics;
        graphics.save();
        graphics.rotate(this.rotation);
        graphics.beginPath();
        graphics.fillStyle = "#FFFFFF";
        graphics.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
        graphics.fill();
        graphics.restore();
    }

}
