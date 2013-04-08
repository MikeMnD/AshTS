export class AsteroidView {

    public x:number = 0;
    public y: number = 0;
    public width: number = 0;
    public height: number = 0;
    public rotation: number = 0;
    public graphics = null;
    public radius: number = 0;
    public points: any[] = null;

    constructor(radius, graphics) {
        this.initialise(radius, graphics);
    }

    public initialise(radius, graphics) {
        this.graphics = graphics;
        this.radius = radius;
        this.width = radius;
        this.height = radius;
        this.points = [];
        var angle = 0;
        while (angle < Math.PI * 2) {
            var length = (0.75 + Math.random() * 0.25) * this.radius;
            var posX = Math.cos(angle) * length;
            var posY = Math.sin(angle) * length;
            this.points.push({ x: posX, y: posY });
            angle += Math.random() * 0.5;
        }
        this.draw();
        return this;
    }

    public draw() {
        var graphics = this.graphics;

        graphics.save();
        graphics.beginPath();
        graphics.translate(this.x, this.y);
        graphics.rotate(this.rotation);
        graphics.fillStyle = "#FFFFFF";
        graphics.moveTo(this.radius, 0);
        for (var i = 0; i < this.points.length; ++i) {
            graphics.lineTo(this.points[i].x, this.points[i].y);
        }
        graphics.lineTo(this.radius, 0);
        graphics.fill();
        graphics.restore();
    

}