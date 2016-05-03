<template lang="jade">
    li.conversation
        span(v-for="contact in conversation.contacts") {{ contact.name && contact.name.first || "..." }},
        p {{ conversation.notes | ellipsize }}
</template>

<script>
    const base = require("../base");

    export default {
        data,

        props: ["conversation"],

        created: function () {
            this.conversation.contacts.forEach(doFetch);

            let self = this;

            function doFetch (key, _i) {
                base.child("contacts/" + key).once("value", onChild);

                function onChild (snap) {
                    self.conversation.contacts.$set(_i, snap.val());
                }
            }
        },

        methods: {

        }
    }

    function data () {
        return {
            /*conversation: {}*/
        };
    }
</script>

<style lang="stylus" scoped>
</style>
