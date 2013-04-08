define(["require", "exports"], function(require, exports) {
    var SystemPriorities = (function () {
        function SystemPriorities() { }
        SystemPriorities.preUpdate = 1;
        SystemPriorities.update = 2;
        SystemPriorities.move = 3;
        SystemPriorities.resolveCollisions = 4;
        SystemPriorities.render = 5;
        return SystemPriorities;
    })();
    exports.SystemPriorities = SystemPriorities;    
})
//@ sourceMappingURL=SystemPriorities.js.map
