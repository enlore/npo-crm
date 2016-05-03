/* jshint node: true, esversion: 6 */

const Vue             = require("vue");
const VueRouter       = require("vue-router");
const Dash            = require("./pages/dash.vue");
const NewContact      = require("./pages/newContact.vue");
const NewConversation = require("./pages/newConversation.vue");
const Nav             = require("./comps/nav.vue");

const Contact         = require("./models/contact");
const Conversation    = require("./models/conversation");
const registerFilters = require("./filters");

const base            = require("./base");
const store           = require("./store");

base.child("contacts-by-email").on("value", function setContactsByEmail (snap) {
    store.set("contacts-by-email", snap.val());
});

const App = Vue.extend({
    components: {
        "navigation": Nav
    }
});

Vue.use(VueRouter);
registerFilters(Vue);

const router = new VueRouter();

//router.beforeEach(checkAuth);

router.map({
    "/": {
        component: Dash,
        authRequired: true
    },

    "/contact/create": {
        component: NewContact,
        authRequired: true
    },

    "/conversation/create": {
        component: NewConversation,
        authRequired: true
    }
});

router.start(App, "#app");
