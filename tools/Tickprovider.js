define(["require", "exports", "tools/Signal"], function(require, exports, __MSignal__) {
    
    var MSignal = __MSignal__;

    var TickProvider = (function () {
        function TickProvider() {
            this.previousTime = 0;
            this.ticked = new MSignal.Signal();
            this.request = null;
            this.add = function (listener, context) {
                this.ticked.add(listener, context);
            };
        }
        TickProvider.prototype.start = function () {
            this.previousTime = Date.now();
            this.request = window.requestAnimFrame(this.tick.bind(this));
        };
        TickProvider.prototype.stop = function () {
            window.cancelRequestAnimFrame(this.request);
        };
        TickProvider.prototype.remove = function (listener, context) {
            this.ticked.remove(listener, context);
        };
        TickProvider.prototype.tick = function (timestamp) {
            timestamp = timestamp || Date.now();
            var tmp = this.previousTime;
            this.previousTime = timestamp;
            var delta = (timestamp - tmp) * 0.001;
            this.ticked.dispatch(delta);
            requestAnimationFrame(this.tick.bind(this));
        };
        return TickProvider;
    })();
    exports.TickProvider = TickProvider;    
})
//@ sourceMappingURL=TickProvider.js.map
