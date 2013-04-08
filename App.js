define(["require", "exports", "Scripts/libs/jquery/jquery", "Scripts/libs/dat.gui/dat.gui", "game/Asteroids"], function(require, exports, __JQuery__, __MDat__, __MAsteroids__) {
    
    var JQuery = __JQuery__;

    var $ = JQuery.$;
    var MDat = __MDat__;

    var dat = MDat.gui;
    var MAsteroids = __MAsteroids__;

    window.DEBUG = false;
    (function (App) {
        App.MyGame;
        App.MyDat = dat;
        App.AppStarted = false;
        var CANVAS_WIDTH = 800;
        var CANVAS_HEIGHT = 600;
        App.Start = function () {
            if(!App.AppStarted) {
                console.log("app started");
                var canvasElem = createCanvas();
                document.getElementById("content").appendChild(canvasElem);
                var asteroids = new MAsteroids.Asteroids();
                asteroids.initialise(canvasElem);
                asteroids.start();
                window.mg = window.CurrentApp.App.MyGame;
                App.AppStarted = true;
            } else {
                console.log("App is singleton and is already started!");
            }
        };
        function createCanvas() {
            var canvasElem = document.createElement("canvas");
            canvasElem.setAttribute("id", "game_stage");
            canvasElem.setAttribute("width", CANVAS_WIDTH.toString());
            canvasElem.setAttribute("height", CANVAS_HEIGHT.toString());
            canvasElem.style.backgroundColor = "#000";
            return canvasElem;
        }
        App.InitDebugUI = function (dat) {
            var FizzyText = function () {
                this.message = 'dat.gui';
                this.speed = 0.8;
                this.displayOutline = false;
                this.explode = function () {
                };
            };
            var text = new FizzyText();
            var gui = new dat.GUI();
            gui.add(text, 'message');
            gui.add(text, 'speed', -5, 5);
            gui.add(text, 'displayOutline');
            gui.add(text, 'explode');
        };
        require([
            'Scripts/libs/domReady!'
        ], function (doc) {
            console.log("document ready");
            if(window.DEBUG) {
                App.InitDebugUI(dat);
            }
            App.Start();
        });
    })(exports.App || (exports.App = {}));
    var App = exports.App;
    var InstanceLoader = (function () {
        function InstanceLoader(context) {
            this.context = context;
        }
        InstanceLoader.prototype.getInstance = function (name) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            var instance = Object.create(this.context[name].prototype);
            instance.constructor.apply(instance, args);
            return instance;
        };
        return InstanceLoader;
    })();    
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback, element) {
            return window.setTimeout(callback, 1000 / 60);
        };
    })();
    window.cancelRequestAnimFrame = (function () {
        return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout;
    })();
})
//@ sourceMappingURL=App.js.map
