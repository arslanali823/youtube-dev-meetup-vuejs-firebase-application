<template>
    <v-alert type="error" color="error" dark dismissible @input="onClose">
        {{ text }}
    </v-alert>
</template>

<script>
    export default {
        name: "Alert",
        props: {
            text: String
        },
        methods: {
            onClose(){
                this.$emit('dismissed')
            }
        }
    }
</script>

<style scoped>

</style>
