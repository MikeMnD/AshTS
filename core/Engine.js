define(["require", "exports", "core/EntityList", "core/SystemList", "core/ComponentMatchingFamily", "tools/Signal", "tools/Dictionary"], function(require, exports, __MEntityList__, __MSystemList__, __MComponentMatchingFamily__, __MSignal__, __MDictionary__) {
    
    
    var MEntityList = __MEntityList__;

    var MSystemList = __MSystemList__;

    
    
    var MComponentMatchingFamily = __MComponentMatchingFamily__;

    var MSignal = __MSignal__;

    var MDictionary = __MDictionary__;

    (function (ash) {
        (function (core) {
            var Engine = (function () {
                function Engine() {
                    this.familyClass = MComponentMatchingFamily.ash.core.ComponentMatchingFamily;
                    this._entityList = new MEntityList.ash.core.EntityList();
                    this._systemList = new MSystemList.ash.core.SystemList();
                    this._families = new MDictionary.ash.tools.Dictionary();
                    this.updateComplete = new MSignal.Signal();
                }
                Object.defineProperty(Engine.prototype, "entites", {
                    get: function () {
                        var tmpEntities = [];
                        for(var entity = this._entityList.head; entity; entity = entity.next) {
                            tmpEntities.push(entity);
                        }
                        return tmpEntities;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Engine.prototype, "systems", {
                    get: function () {
                        var tmpSystems = [];
                        for(var system = this._systemList.head; system; system = system.next) {
                            tmpSystems.push(system);
                        }
                        return tmpSystems;
                    },
                    enumerable: true,
                    configurable: true
                });
                Engine.prototype.addEntity = function (entity) {
                    this._entityList.add(entity);
                    entity.componentAdded.add(this._componentAdded, this);
                    entity.componentRemoved.add(this._componentAdded, this);
                    this._families.forEach(function (nodeObject, family) {
                        family.newEntity(entity);
                    });
                };
                Engine.prototype.removeEntity = function (entity) {
                    entity.componentAdded.remove(this._componentAdded, this);
                    entity.componentRemoved.remove(this._componentRemoved, this);
                    this._families.forEach(function (nodeObject, family) {
                        family.removeEntity(entity);
                    });
                    this._entityList.remove(entity);
                };
                Engine.prototype.removeAllEntities = function () {
                    while(this._entityList.head) {
                        this.removeEntity(this._entityList.head);
                    }
                };
                Engine.prototype._componentAdded = function (entity, componentClass) {
                    this._families.forEach(function (nodeObject, family) {
                        family.componentAddedToEntity(entity, componentClass);
                    });
                };
                Engine.prototype._componentRemoved = function (entity, componentClass) {
                    this._families.forEach(function (nodeObject, family) {
                        family.componentRemovedFromEntity(entity, componentClass);
                    });
                };
                Engine.prototype.getNodeList = function (nodeClass) {
                    if(this._families.has(nodeClass)) {
                        return this._families.getValue(nodeClass).nodes;
                    }
                    var family = new this.familyClass(nodeClass, this);
                    this._families.add(nodeClass, family);
                    for(var entity = this._entityList.head; entity; entity = entity.next) {
                        family.newEntity(entity);
                    }
                    return family.nodeList();
                };
                Engine.prototype.releaseNodeList = function (nodeClass) {
                    if(this._families.has(nodeClass)) {
                        this._families.getValue(nodeClass).cleanUp();
                    }
                    this._families.remove(nodeClass);
                };
                Engine.prototype.addSystem = function (system, priority) {
                    system.priority = priority;
                    system.addToEngine(this);
                    this._systemList.add(system);
                };
                Engine.prototype.getSystem = function (type) {
                    return this._systemList.get(type);
                };
                Engine.prototype.removeSystem = function (system) {
                    this._systemList.remove(system);
                    system.removeFromEngine(this);
                };
                Engine.prototype.removeAllSystems = function () {
                    while(this._systemList.head) {
                        this.removeSystem(this._systemList.head);
                    }
                };
                Engine.prototype.update = function (time) {
                    this.updating = true;
                    for(var system = this._systemList.head; system; system = system.next) {
                        system.update(time);
                    }
                    this.updating = false;
                    this.updateComplete.dispatch();
                };
                return Engine;
            })();
            core.Engine = Engine;            
        })(ash.core || (ash.core = {}));
        var core = ash.core;
    })(exports.ash || (exports.ash = {}));
    var ash = exports.ash;
})
//@ sourceMappingURL=Engine.js.map
