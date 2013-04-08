import MSystem = module("core/System");
import MEngine = module("core/Engine");

import MRender = module("game/nodes/Render");

export class RenderSystem extends MSystem.ash.core.System {
    constructor(graphicsContext) {
        super();
        this.initialise(graphicsContext);
    }

    public context = null;
    public nodes = null;

    private _count = 0;

    public initialise(graphicsContext) {
        this.context = graphicsContext;
        return this;
    }

    public addToEngine(engine: MEngine.ash.core.Engine) {
        this.nodes = engine.getNodeList(MRender.Render);
        for (var node = this.nodes.head; node; node = node.next) {
            this.addToDisplay(node);
        }
        this.nodes.nodeAdded.add(this.addToDisplay, this);
        this.nodes.nodeRemoved.add(this.removeFromDisplay, this);
    }

    public removeFromEngine(engine) {
        this.nodes = null;
    }

    public addToDisplay(node) {
        // Intentionally left blank
    }

    public removeFromDisplay(node) {
        // Intentionally left blank
    }

    public update(time) {

        var node;
        var position;
        var display;
        var graphic;

        this.context.save();
        this.context.translate(0, 0);
        this.context.rotate(0);
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        for (node = this.nodes.head; node; node = node.next) {

            display = node.display;
            graphic = display.graphic;
            position = node.position;

            graphic.x = position.position.x;
            graphic.y = position.position.y;
            graphic.rotation = position.rotation;
            graphic.draw();
        }
        this.context.restore();
    }

}