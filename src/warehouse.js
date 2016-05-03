/* jshint node: true, esversion: 6 */

const store = require("./store");
const base = require("./base");
const Conversation = require("./models/conversation");
const Contact = require("./models/contact");

/*
 * Maintain shipping manifests:
 *   what's in stock
 *   what's just come in
 *   what's just gone out
 *   request this from inventory
 *   request this be shipped in
 */
class Warehouse {
    constructor (opts) {
        this.store = store;
        this.stock = {};
        opts.classes.forEach(_class => this.stock[_class.name] = _class.class);

        this.setupShipping();
    }

    fetch (item) {
        if (item in this.stock) {
            this.stock[item].get(null, base, onGet);
        }

        function onGet (err, items) {
            store.set(item, items);
            store.emit("fetched", item, items);
        }
    }

    setupShipping (_class) {
        if (!_class) {
            //for (let _item in this.stock) {
            //}
        } else {

        }
    }

    _onAdded (snap) {}

    _onUpdated (snap) {}

    _onRemoved (snap) {}

    _onError (err) {
        if (err) throw err;
    }
}

module.exports = new Warehouse({
    classes: [
        { name: "conversation", class: Conversation },
        { name: "contact", class: Contact }
    ]
});
