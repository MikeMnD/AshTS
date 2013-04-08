define(["require", "exports"], function(require, exports) {
    
    (function (ash) {
        (function (core) {
            var EntityList = (function () {
                function EntityList() {
                }
                EntityList.prototype.add = function (entity) {
                    if(!this.head) {
                        this.head = this.tail = entity;
                        entity.next = entity.previous = null;
                    } else {
                        this.tail.next = entity;
                        entity.previous = this.tail;
                        entity.next = null;
                        this.tail = entity;
                    }
                };
                EntityList.prototype.remove = function (entity) {
                    if(this.head == entity) {
                        this.head = this.head.next;
                    }
                    if(this.tail == entity) {
                        this.tail = this.tail.previous;
                    }
                    if(entity.previous) {
                        entity.previous.next = entity.next;
                    }
                    if(entity.next) {
                        entity.next.previous = entity.previous;
                    }
                };
                EntityList.prototype._removeAll = function () {
                    while(this.head) {
                        var entity = this.head;
                        this.head = this.head.next;
                        entity.previous = null;
                        entity.next = null;
                    }
                    this.tail = null;
                };
                return EntityList;
            })();
            core.EntityList = EntityList;            
        })(ash.core || (ash.core = {}));
        var core = ash.core;
    })(exports.ash || (exports.ash = {}));
    var ash = exports.ash;
})
//@ sourceMappingURL=EntityList.js.map
