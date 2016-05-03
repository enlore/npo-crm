/* jshint node: true, esversion: 6 */
const cuid = require("cuid");

class Conversation {
    constructor (opts, base) {
        opts = opts || {};

        this.base = base;

        this.created = opts.created || Date.now();

        if (!opts.created) {
            this.touched = this.created;
        }

        this.contacts = opts.contacts || [];
        this.notes = opts.notes || "";
        this.date = opts.date || Date.now();
        this.todos = opts.todos || [];
        this.location = opts.location || "";

        this.id = opts.id || cuid();
    }

    toDoc () {
        return {
            id: this.id,
            contacts: this.contacts,
            notes: this.notes,
            date: this.date,
            todos: this.todos,
            location: this.location,
            created: this.created,
            touched: this.touched
        };
    }

    save () {
        const ref = this.base.child("conversations/" + this.id);

        ref.once("value", onVal);

        const self = this;

        function onVal (snap) {
            if (snap.val() !== null) {
                let err = new Error("Key already exists: " + self.id);
                err.statusCode = 400;
                cb(err);

            } else {
                ref.set(self.toDoc(), onSet);
            }
        }

        function onSet (err) {
            if (err) throw err;

            let d = {};

            d[self.id] = true;

            self.base.child("conversations-by-date/" + self.date).update(d, onErr);

            self.contacts.forEach((contact) => {
                self.base.child("conversations-by-contact/" + contact).update(d, onErr);
            });
        }

        function onErr (err) {
            if (err) throw err;
        }
    }

    update () {}

    remove () {}
}


Conversation.get = function get (id, base, cb) {
    if (id === null) {
        const ref = base.child("conversations");
        ref.once("value", onAll);

    } else {
        const ref = base.child("conversations/" + id);
        ref.once("value", onGet);
    }

    function onAll (snap) {
        let data = snap.val();

        if (data === null) {
            cb(null, []);

        } else {
            cb(null, data);
        }
    }

    function onGet (snap) {
        const data = snap.val();

        if (data) {
            const contact = new Contact(data, base);
            cb(null, contact);

        } else {
            let err = new Error("Conversation Not Found - cuid: " + id);
            err.statusCode = 404;
            cb(err);
        }
    }
};

module.exports = Conversation;
