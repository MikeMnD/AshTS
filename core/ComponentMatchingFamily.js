define(["require", "exports", "core/NodeList", "core/NodePool", "core/IFamily", "tools/Dictionary"], function(require, exports, __MNodeList__, __MNodePool__, __MFamily__, __MDictionary__) {
    
    
    
    
    
    var MNodeList = __MNodeList__;

    
    var MNodePool = __MNodePool__;

    var MFamily = __MFamily__;

    
    var MDictionary = __MDictionary__;

    (function (ash) {
        (function (core) {
            var ComponentMatchingFamily = (function () {
                function ComponentMatchingFamily(nodeClass, engine) {
                    this._nodeClass = nodeClass;
                    this._engine = engine;
                    this._nodePool = new MNodePool.ash.core.NodePool(this._nodeClass);
                    this._nodes = new MNodeList.ash.core.NodeList();
                    this._entities = new MDictionary.ash.tools.Dictionary();
                    this._components = new MDictionary.ash.tools.Dictionary();
                    this._nodePool.dispose(this._nodePool.get());
                    var nodeClassPrototype = this._nodeClass.prototype;
                    for(var property in nodeClassPrototype) {
                        if(nodeClassPrototype.hasOwnProperty(property) && property != "types" && property != "next" && property != "previous" && property != "constructor" && property != "super" && property != "extend" && property != "entity") {
                            var componentObject = nodeClassPrototype["types"][property];
                            this._components.add(componentObject, property);
                        }
                    }
                    this._init();
                }
                ComponentMatchingFamily.prototype._init = function () {
                };
                ComponentMatchingFamily.prototype.nodeList = function () {
                    return this._nodes;
                };
                ComponentMatchingFamily.prototype.newEntity = function (entity) {
                    this.addIfMatch(entity);
                };
                ComponentMatchingFamily.prototype.componentAddedToEntity = function (entity, componentClass) {
                    this.addIfMatch(entity);
                };
                ComponentMatchingFamily.prototype.componentRemovedFromEntity = function (entity, componentClass) {
                    if(this._components.has(componentClass)) {
                        this.removeIfMatch(entity);
                    }
                };
                ComponentMatchingFamily.prototype.removeEntity = function (entity) {
                    this.removeIfMatch(entity);
                };
                ComponentMatchingFamily.prototype.addIfMatch = function (entity) {
                    if(!this._entities.getValue(entity)) {
                        var componentClass;
                        for(componentClass in this._components) {
                            if(!entity.has(componentClass)) {
                                return;
                            }
                        }
                        var node = this._nodePool.get();
                        node.entity = entity;
                        for(componentClass in this._components) {
                            node[this._components[componentClass]] = entity.get(componentClass);
                        }
                        this._entities.add(entity, node);
                        this._nodes.add(node);
                    }
                };
                ComponentMatchingFamily.prototype.removeIfMatch = function (entity) {
                    if(this._entities.getValue(entity)) {
                        var node = this._entities.getValue(entity);
                        this._entities.remove(entity);
                        this._nodes.remove(node);
                        if(this._engine.updating) {
                            this._nodePool.cache(node);
                            this._engine.updateComplete.add(this._releaseNodePoolCache, this);
                        } else {
                            this._nodePool.dispose(node);
                        }
                    }
                };
                ComponentMatchingFamily.prototype._releaseNodePoolCache = function () {
                    this._engine.updateComplete.remove(this._releaseNodePoolCache);
                    this._nodePool.releaseCache();
                };
                ComponentMatchingFamily.prototype.cleanUp = function () {
                    for(var node = this._nodes.head; node; node = node.next) {
                        this._entities.remove(node.entity);
                    }
                    this._nodes.removeAll();
                };
                return ComponentMatchingFamily;
            })();
            core.ComponentMatchingFamily = ComponentMatchingFamily;            
        })(ash.core || (ash.core = {}));
        var core = ash.core;
    })(exports.ash || (exports.ash = {}));
    var ash = exports.ash;
})
//@ sourceMappingURL=ComponentMatchingFamily.js.map
