<template lang="jade">
.new-contact-form
    fieldset
        legend Name

        .control-group
            label First Name *
            input(v-model="name.first", type="text")

        .control-group
            label Last Name *
            input(v-model="name.last", type="text")

        .control-group
            label Middle
            input(v-model="name.middle", type="text")

        .control-group
            label Suffix
            input(v-model="name.suffix", type="text")

        .control-group
            label Title
            input(v-model="name.title", type="text")

    fieldset
        legend Email

        .control-group
            label Primary
            input(v-model="email.primary", type="text")

        .control-group
            label Work
            input(v-model="email.work", type="text")

        .control-group
            label Alt
            input(v-model="email.alt", type="text")


    fieldset
        legend Phone

        .control-group
            label Cell
            input(v-model="phone.cell", type="text")

        .control-group
            label Work
            input(v-model="phone.work", type="text")

        .control-group
            label Home
            input(v-model="phone.home", type="text")


    fieldset
        legend Organizations

        .control-group
            label Org Name
            select(v-model="organizations", multiple, size=10)
                option(v-for="org in orgOptions", v-bind:value="org") {{ org }}

    .control-group
        button(@click="save") Save

</template>

<script>
    const Contact = require("../models/contact");
    const base    = require("../base");

    export default {
        data,

        created: function () {
            base.child("organizations").on("value", onVal);

            const self = this;

            function onVal (snap) {
                let arr = [];
                let orgs = snap.val();

                for (let key in orgs) {
                    arr.push(key);
                }

                self.orgOptions = arr;
            }
        },

        methods: {
            save: function (ev) {
                let contact = new Contact(this, base);

                this.clear();
            },

            clear: function clear () {
                this.name = {
                    first: "",
                    last: "",
                    middle: "",
                    title: "",
                    suffix: ""
                };

                this.email = {
                    primary: "",
                    work: "",
                    alt: ""
                };

                this.phone = {
                    cell: "",
                    work: "",
                    home: ""
                };

                this.organizations = [];
                this.conversations = [];
            }
        }
    }

    function data () {
        return {
            name: {
                first: "",
                last: "",
                middle: "",
                title: "",
                suffix: ""
            },

            email: {
                primary: "",
                work: "",
                alt: ""
            },

            phone: {
                cell: "",
                work: "",
                home: ""
            },

            orgOptions: [ "default" ],
            organizations: [],
            conversations: []
        }
    }
</script>

<style lang="stylus">
    .new-contact-form
        max-width 800px
</style>
