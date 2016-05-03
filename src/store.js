/* jshint node: true, esversion: 6 */
"use strict";
const EE = require("events").EventEmitter;

class Store {
    constructor () {
        this.store = {};
        // by prop name
        //   by ev
        this.listeners = {};
    }

    set (key, val) {
        if (this.listeners[key])
            this.emit("write", key, val);

        this.store[key] = val;
    }

    get (key) {
        if (this.listeners[key])
            this.emit("read", key);

        return this.store[key] || null;
    }

    /* does not emit */
    has (key) {
        if (this.store[key])
            return true;

        return false;
    }

    push (key, val) {
        let prop = this.store[key];

        if (prop && Array.isArray(prop))
            prop.push(val);
        else if (!prop) {
            this.store[key] = [val];
        } else {
            throw new Error("Prop is not an array");
        }
    }

    pop (key) {
        let prop = this.store[key];

        if (prop && Array.isArray(prop))
            return prop.pop();
        else
            throw new Error("Prop is not an array");
    }

    on (ev, key, cb) {
        if (!this.listeners[key]) {
            this.listeners[key] = {};
            this.listeners[key][ev] = [];
        }

        this.listeners[key][ev].push(cb);
    }

    off (ev, key, cb) {
        if (this.listeners[key] && this.listeners[key][ev]) {

            if (!cb) {
                delete this.listeners[key][ev];

            } else {
                let cbs = this.listeners[key][ev];

                for (let _cb of cbs) {
                    if (cb === _cb) _cb = null;
                }
            }
        }
    }

    emit (ev, key, data) {
        let _l = this.listeners[key];

        if (_l && _l[ev]) {
            let cbs = _l[ev];

            for (let cb of cbs) {
                cb(data);
            }
        }
    }
}

module.exports = new Store();
