<template lang="jade">
.container
    p New Conversation Form

    new-conversation
</template>

<script>
    const NewConversationForm = require("../comps/newConversation.vue");

    export default {
        data,

        created: function created () {

        },

        components: {
            "new-conversation": NewConversationForm
        },

        methods: {

        }
    }

    function data () {
        return {

        };
    }
</script>

<style lang="stylus" scoped>
</style>
