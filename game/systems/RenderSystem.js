var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "core/System", "game/nodes/Render"], function(require, exports, __MSystem__, __MRender__) {
    var MSystem = __MSystem__;

    
    var MRender = __MRender__;

    var RenderSystem = (function (_super) {
        __extends(RenderSystem, _super);
        function RenderSystem(graphicsContext) {
                _super.call(this);
            this.context = null;
            this.nodes = null;
            this._count = 0;
            this.initialise(graphicsContext);
        }
        RenderSystem.prototype.initialise = function (graphicsContext) {
            this.context = graphicsContext;
            return this;
        };
        RenderSystem.prototype.addToEngine = function (engine) {
            this.nodes = engine.getNodeList(MRender.Render);
            for(var node = this.nodes.head; node; node = node.next) {
                this.addToDisplay(node);
            }
            this.nodes.nodeAdded.add(this.addToDisplay, this);
            this.nodes.nodeRemoved.add(this.removeFromDisplay, this);
        };
        RenderSystem.prototype.removeFromEngine = function (engine) {
            this.nodes = null;
        };
        RenderSystem.prototype.addToDisplay = function (node) {
        };
        RenderSystem.prototype.removeFromDisplay = function (node) {
        };
        RenderSystem.prototype.update = function (time) {
            var node;
            var position;
            var display;
            var graphic;
            this.context.save();
            this.context.translate(0, 0);
            this.context.rotate(0);
            this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
            for(node = this.nodes.head; node; node = node.next) {
                display = node.display;
                graphic = display.graphic;
                position = node.position;
                graphic.x = position.position.x;
                graphic.y = position.position.y;
                graphic.rotation = position.rotation;
                graphic.draw();
            }
            this.context.restore();
        };
        return RenderSystem;
    })(MSystem.ash.core.System);
    exports.RenderSystem = RenderSystem;    
})
//@ sourceMappingURL=RenderSystem.js.map
