/* jshint node: true, esversion: 6 */
const cuid = require("cuid");

class Contact {
    constructor (opts, base) {
        opts = opts || {};
        opts.name = opts.name   || {};
        opts.email = opts.email || {};
        opts.phone = opts.phone || {};

        this.base = base;
        this.ref = this.base.child("contacts");

        this.created = opts.created || Date.now();

        if (!opts.created) {
            this.touched = this.created;
        }

        this.name = {};
        this.name.first     = opts.name.first   || "";
        this.name.last      = opts.name.last    || "";
        this.name.middle    = opts.name.middle  || "";
        this.name.title     = opts.name.title   || "";
        this.name.suffix    = opts.name.suffix  || "";

        this.email = {};
        this.email.primary = opts.email.primary     || "";
        this.email.work     = opts.email.work       || "";
        this.email.alt      = opts.email.alt        || "";

        this.phone = {};
        this.phone.cell     = opts.phone.cell       || "";
        this.phone.home     = opts.phone.home       || "";
        this.phone.work     = opts.phone.work       || "";

        this.organizations  = opts.organizations    || [];
        this.conversations  = opts.conversations    || [];

        this.id             = opts.id || cuid();
    }

    toDoc () {
        return {
            name: this.name,
            email: this.email,
            phone: this.phone,
            organizations: this.organizations,
            conversations: this.conversations,
            id: this.id,
            created: this.created,
            touched: this.touched
        };
    }

    save (cb) {
        const ref = this.base.child("contacts/" + this.id);

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

            // fbase keys can't have ., $, #, [, or ]
            let email = self.email.primary.replace(/[\[\]\.\$#]/g, "_");

            self.base.child("contacts-by-email/" + email).update(d, onErr);

            let phone = self.phone.cell;
            let cell = phone.replace(/[^0-9]/g, "");

            self.base.child("contacts-by-phone/" + cell).update(d, onErr);

            if (self.organizations.length > 0) {
                self.organizations.forEach((org) => {
                    self.base.child("contacts-by-organization/" + org.name + "/").update(d, onErr);
                });
            }
        }

        function onErr (err) {
            if (err) throw err;
        }
    }

    update () {}

    remove () {}
}

//Contact.ref = base.child("contacts");

//Contact.on = function on (ev, cb, ctx) {
    //this.ref.on(ev, cb, ctx);
//};

//Contact.once = function once (ev, cb, ctx) {
    //this.ref.once(ev, cb, ctx);
//};

Contact.get = function get (id, base, cb) {
    if (id === null) {
        const ref = base.child("contacts");
        ref.once("value", onAll);

    } else {
        const ref = base.child("contacts/" + id);
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
            let err = new Error("Contact Not Found - cuid: " + id);
            err.statusCode = 404;
            cb(err);
        }
    }
};

module.exports = Contact;
