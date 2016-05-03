<template lang="jade">
nav
    .container
        ul
            li
                a(v-link="{ path: '/' }") Dash

            li
                a(v-link="{ path: '/contact/create' }") Add Contact

            li
                a(v-link="{ path: 'conversation/create' }") Add Conversation
</template>

<script>

</script>

<style lang="stylus" scoped>
    nav
        padding-top 10px
        padding-bottom 10px

    ul
        float left

    ul li
        display inline-block
        margin-right 1rem

    .profile-image
        float right
</style>
