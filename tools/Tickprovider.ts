import MIWindow = module("tools/IWindow");
declare var window: MIWindow.IWindow;

import MSignal = module("tools/Signal");

// Module
export class TickProvider {

        previousTime = 0;
        ticked = new MSignal.Signal();
        request = null;

        constructor() {
        }

        start() {
            this.previousTime = Date.now();
            this.request = window.requestAnimFrame(this.tick.bind(this));
        };

        stop() {
            window.cancelRequestAnimFrame(this.request);
        };

        add = function (listener, context) {
            this.ticked.add(listener, context);
        };

        remove(listener, context) {
            this.ticked.remove(listener, context);
        };

        tick(timestamp) {
            timestamp = timestamp || Date.now();
            var tmp = this.previousTime;
            this.previousTime = timestamp;
            var delta = (timestamp - tmp) * 0.001;
            this.ticked.dispatch(delta);
            requestAnimationFrame(this.tick.bind(this));
        };

}
