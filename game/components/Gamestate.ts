export class GameState {

    public lives:number = 0;
    public level: number = 0;
    public points: number = 0;
    public width: number = null;
    public height: number = null;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}