<template lang="jade">
.new-conversation-form
    .form-group
        label Date
        input(type="date", v-model="date")

    .form-group
        label Location Address
        input(type="text", v-model="location")

    fieldset
        legend Contacts

        .form-group
            ul
                template(v-for="contact in contacts", track-by="$index")
                    li.flex
                        button(@click="removeContact($index)") X
                        input(type="text", v-model="contacts[$index]", debounce="400")

            button(@click="addContactField") Add Contact


    fieldset
        legend Notes

        .form-group
            textarea(v-model="notes")

    fieldset
        legend Next Steps


        .form-group
            ul
                template(v-for="todo in todos", track-by="$index")
                    li.flex
                        button(@click="removeTodo($index)") X
                        input(type="text", v-model="todos[$index]")

            button(@click="addTodoField") Add Todo

    .form-group
        button(@click="save") Save


</template>

<script>
    const base         = require("../base");
    const store        = require("../store");
    const Conversation = require("../models/conversation");

    export default {
        data,

        created: function created () {

        },

        components: {

        },

        methods: {
            save: function save () {
                let conversation = new Conversation(this, base);

                this.clear();
            },

            addTodoField: function () {
                this.todos.push("");
            },

            removeTodo: function (_i) {
                this.todos.splice(_i, 1);
            },

            addContactField: function () {
                this.contacts.push("");
                this.$watch(lastContact, this.doSearch);

                function lastContact () {
                    let last = this.contacts.length - 1;
                    return this.contacts[last];
                }
            },

            removeContact: function (_i) {
                this.contacts.splice(_i, 1);
            },

            doSearch: function doSearch (oldVal, newVal) {
                if (store.has("contacts-by-email")) {
                    doFilter.call(this, store.get("contacts-by-email"));

                } else {
                    store.on("write", "contacts-by-emai", doFilter.bind(this));
                }

                function doFilter (contacts) {
                    for (let email in contacts) {
                        console.log(email);
                    }
                }
            },

            clear: function clear () {
                this.notes = "";
                this.location = "";
                this.todos = [""];
                this.contacts = [];
                this.date = "";
            }
        }
    }

    function data () {
        return {
            notes: "",
            location: "",
            date: "",
            contacts: [],
            todos: [
                ""
            ]
        };
    }
</script>

<style lang="stylus" scoped>
    ul li.flex
        display flex

    ul li.flex input
        margin-left 1rem

    ul li.flex *
        flex 0 0 auto
</style>
