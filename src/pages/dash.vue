<template lang="jade">
.container
    ul.conversations
        conversation(v-for="conversation in conversations", :conversation="conversation", :index="$index")
</template>

<script>
    const warehouse = require("../warehouse");
    const base = require("../base");
    const Conversation = require("../comps/conversation.vue");

    export default {
        data,

        components: {
            conversation: Conversation
        },

        methods: {
        },

        created: function () {
            warehouse.fetch("conversation");
            warehouse.store.on("fetched", "conversation", onFetch);

            let self = this;

            function onFetch (convs) {
                self.conversations = convs;
            }
        }
    }

    function data () {
        return {
            test: "woo",
            conversations: []
        }
    }
</script>

<style lang="stylus" scoped>
    ul.conversations li.conversation
        border 1px solid grey
        padding 1rem

</style>
