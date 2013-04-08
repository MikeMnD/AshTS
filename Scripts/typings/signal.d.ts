
/*
   Interface for Signal
*/
interface Signal {

    Signal();

    active?: bool;
    memorize?: bool;
    VERSION?: string;

    add(listener: () => any, listenerContext?: Object, priority?: number): SignalBinding;
    addOnce(listener: () => any, listenerContext?: Object, priority?: number): SignalBinding;
    dispatch(params?: any[]);
    dispose();
    forget();
    getNumListeners(): number;
    halt();
    has(listener: () => any, context?: Object): bool;
    remove(listener: () => any, context?: Object): () => any;
    removeAll();
    toString(): string;

}

declare var signals: Signal;