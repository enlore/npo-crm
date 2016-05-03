<template lang="jade">
.container
    p New Contact Form

    new-contact
</template>

<script>
    const NewContactForm = require("../comps/newContact.vue");

    export default {
        data,

        components: {
            "new-contact": NewContactForm
        },
    }

    function data () {
        return {
        }
    }
</script>

<style lang="stylus">
</style>
