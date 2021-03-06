import MIWindow = module("tools/IWindow");
declare var window: MIWindow.IWindow;

// Class
export class Keypoll {

    public keys = {};
    public global = window;

    public up = "38";
    public down = "40";
    public left = "37";
    public right = "39";
    public fire = "32";

    onKeyDown(event) {
        event.preventDefault();
        this.keys[event.keyCode] = true;
    }

    onKeyUp(event) {
        event.preventDefault();
        if (this.keys[event.keyCode]) {
            this.keys[event.keyCode] = null;
            delete this.keys[event.keyCode];
        }
    }

    addListeners() {
        this.global.addEventListener("keydown", this.onKeyDown);
        this.global.addEventListener("keyup", this.onKeyUp);
    }

    addListeners();


    getKeys(): any {
        return this.keys;
    };

    isDown(testKey) {
        for (var keyCode in this.keys) {
            if (keyCode == testKey) {
                return true;
            }
        }
        return false;
    };

    addKeyboardCodeEnum() {

    }

}

export class Keyboard {

    public static keyboard = {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CONTROL: 17,
        CAPSLOCK: 20,
        ESCAPE: 27,
        SPACEBAR: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        INSERT: 45,
        DELETE: 46,
        NUMLOCK: 144,
        SCROLL_LOCK: 145,
        PAUSE_BREAK: 19,

        ZERO: 48,
        ONE: 49,
        TWO: 50,
        THREE: 51,
        FOUR: 52,
        FIVE: 53,
        SIX: 54,
        SEVEN: 55,
        EIGHT: 56,
        NINE: 57,

        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,

        NUMPAD_ZERO: 96,
        NUMPAD_ONE: 97,
        NUMPAD_TWO: 98,
        NUMPAD_THREE: 99,
        NUMPAD_FOUR: 100,
        NUMPAD_FIVE: 101,
        NUMPAD_SIX: 102,
        NUMPAD_SEVEN: 103,
        NUMPAD_EIGHT: 104,
        NUMPAD_NINE: 105,
        NUMPAD_MULTIPLY: 106,
        NUMPAD_ADD: 107,
        NUMPAD_ENTER: 13,
        NUMPAD_SUBTRACT: 109,
        NUMPAD_DECIMAL: 110,
        NUMPAD_DIVIDE: 111
    };

}

