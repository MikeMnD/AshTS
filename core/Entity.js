define(["require", "exports", "tools/Signal", "tools/Dictionary"], function(require, exports, __MSignal__, __MDictionary__) {
    var MSignal = __MSignal__;

    var MDictionary = __MDictionary__;

    (function (ash) {
        (function (core) {
            var Entity = (function () {
                function Entity() {
                    this.componentAdded = new MSignal.Signal();
                    this.componentRemoved = new MSignal.Signal();
                    this._components = new MDictionary.ash.tools.Dictionary();
                }
                Entity.prototype.add = function (component, componentClass) {
                    if (typeof componentClass === "undefined") { componentClass = null; }
                    if(!componentClass) {
                        componentClass = component.prototype;
                    }
                    if(this._components.has(componentClass)) {
                        this.remove(componentClass);
                    }
                    this._components.add(componentClass, component);
                    this.componentAdded.dispatch(this, componentClass);
                    return this;
                };
                Entity.prototype.remove = function (componentClass) {
                    var component = this._components.getValue(componentClass);
                    if(component) {
                        this._components.remove[componentClass];
                        this.componentRemoved.dispatch(this, componentClass);
                        return component;
                    }
                    return null;
                };
                Entity.prototype.get = function (componentClass) {
                    return this._components.getValue(componentClass.prototype);
                };
                Entity.prototype.getAll = function () {
                    var componentArray = [];
                    this._components.forEach(function (componentClass, component) {
                        componentArray.push(component);
                    });
                    return componentArray;
                };
                Entity.prototype.has = function (componentClass) {
                    return this._components.has(componentClass) != null;
                };
                return Entity;
            })();
            core.Entity = Entity;            
        })(ash.core || (ash.core = {}));
        var core = ash.core;
    })(exports.ash || (exports.ash = {}));
    var ash = exports.ash;
})
//@ sourceMappingURL=Entity.js.map
