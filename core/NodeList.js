define(["require", "exports", "tools/Signal"], function(require, exports, __MSignal__) {
    var MSignal = __MSignal__;

    
    (function (ash) {
        (function (core) {
            var NodeList = (function () {
                function NodeList() {
                    this.head = null;
                    this.tail = null;
                    this.nodeAdded = new MSignal.Signal();
                    this.nodeRemoved = new MSignal.Signal();
                }
                NodeList.prototype.add = function (node) {
                    if(!this.head) {
                        this.head = this.tail = node;
                        node.next = node.previous = null;
                    } else {
                        this.tail.next = node;
                        node.previous = this.tail;
                        node.next = null;
                        this.tail = node;
                    }
                    this.nodeAdded.dispatch(node);
                };
                NodeList.prototype.remove = function (node) {
                    if(this.head == node) {
                        this.head = this.head.next;
                    }
                    if(this.tail == node) {
                        this.tail = this.tail.previous;
                    }
                    if(node.previous) {
                        node.previous.next = node.next;
                    }
                    if(node.next) {
                        node.next.previous = node.previous;
                    }
                    this.nodeRemoved.dispatch(node);
                };
                NodeList.prototype.removeAll = function () {
                    while(this.head) {
                        var node = this.head;
                        this.head = node.next;
                        node.previous = null;
                        node.next = null;
                        this.nodeRemoved.dispatch(node);
                    }
                    this.tail = null;
                };
                NodeList.prototype.empty = function () {
                    return this.head == null;
                };
                NodeList.prototype.swap = function (node1, node2) {
                    if(node1.previous == node2) {
                        node1.previous = node2.previous;
                        node2.previous = node1;
                        node2.next = node1.next;
                        node1.next = node2;
                    } else if(node2.previous == node1) {
                        node2.previous = node1.previous;
                        node1.previous = node2;
                        node1.next = node2.next;
                        node2.next = node1;
                    } else {
                        var temp = node1.previous;
                        node1.previous = node2.previous;
                        node2.previous = temp;
                        temp = node1.next;
                        node1.next = node2.next;
                        node2.next = temp;
                    }
                    if(this.head == node1) {
                        this.head = node2;
                    } else if(this.head == node2) {
                        this.head = node1;
                    }
                    if(this.tail == node1) {
                        this.tail = node2;
                    } else if(this.tail == node2) {
                        this.tail = node1;
                    }
                    if(node1.previous) {
                        node1.previous.next = node1;
                    }
                    if(node2.previous) {
                        node2.previous.next = node2;
                    }
                    if(node1.next) {
                        node1.next.previous = node1;
                    }
                    if(node2.next) {
                        node2.next.previous = node2;
                    }
                };
                NodeList.prototype.insertionSort = function (sortFunction) {
                    if(this.head == this.tail) {
                        return;
                    }
                    var remains = this.head.next;
                    for(var node = remains; node; node = remains) {
                        remains = node.next;
                        for(var other = node.previous; other; other = other.previous) {
                            if(sortFunction(node, other) >= 0) {
                                if(node != other.next) {
                                    if(this.tail == node) {
                                        this.tail = node.previous;
                                    }
                                    node.previous.next = node.next;
                                    if(node.next) {
                                        node.next.previous = node.previous;
                                    }
                                    node.next = other.next;
                                    node.previous = other;
                                    node.next.previous = node;
                                    other.next = node;
                                }
                                break;
                            }
                        }
                        if(!other) {
                            if(this.tail == node) {
                                this.tail = node.previous;
                            }
                            node.previous.next = node.next;
                            if(node.next) {
                                node.next.previous = node.previous;
                            }
                            node.next = this.head;
                            this.head.previous = node;
                            node.previous = null;
                            this.head = node;
                        }
                    }
                };
                NodeList.prototype.mergeSort = function (sortFunction) {
                    if(this.head == this.tail) {
                        return;
                    }
                    var lists;
                    var start = this.head;
                    var end;
                    while(start) {
                        end = start;
                        while(end.next && sortFunction(end, end.next) <= 0) {
                            end = end.next;
                        }
                        var next = end.next;
                        start.previous = end.next = null;
                        lists.push(start);
                        start = next;
                    }
                    while(lists.length > 1) {
                    }
                    this.tail = this.head = lists[0];
                    while(this.tail.next) {
                        this.tail = this.tail.next;
                    }
                };
                NodeList.prototype._merge = function (head1, head2, sortFunction) {
                    var node;
                    var head;
                    if(sortFunction(head1, head2) <= 0) {
                        head = node = head1;
                        head1 = head1.next;
                    } else {
                        head = node = head2;
                        head2 = head2.next;
                    }
                    while(head1 && head2) {
                        if(sortFunction(head1, head2) <= 0) {
                            node.next = head1;
                            head1.previous = node;
                            node = head1;
                            head1 = head1.next;
                        } else {
                            node.next = head2;
                            head2.previous = node;
                            node = head2;
                            head2 = head2.next;
                        }
                    }
                    if(head1) {
                        node.next = head1;
                        head1.previous = node;
                    } else {
                        node.next = head2;
                        head2.previous = node;
                    }
                    return head;
                };
                return NodeList;
            })();
            core.NodeList = NodeList;            
        })(ash.core || (ash.core = {}));
        var core = ash.core;
    })(exports.ash || (exports.ash = {}));
    var ash = exports.ash;
})
//@ sourceMappingURL=NodeList.js.map
