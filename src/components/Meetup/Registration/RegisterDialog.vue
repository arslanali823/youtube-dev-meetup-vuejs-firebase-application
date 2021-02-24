<template>
    <v-dialog
            v-model="dialog"
            persistent
            max-width="290"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                    class="rounded-0"
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
            >
                {{ registerBtnText }}
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="headline" v-if="userIsRegistered">Unregister from Meetup?</v-card-title>
            <v-card-title v-else>Register for Meetup?</v-card-title>
            <v-card-text>You can always change your decision later on.</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        dark
                        class="rounded-0"
                        color="default"
                        @click="dialog = false"
                >
                    Close
                </v-btn>
                <v-btn
                        dark
                        class="rounded-0"
                        color="primary"
                        @click="onAgree"
                >
                    Confirm
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "RegisterDialog",
        props: ['meetupId'],
        computed: {
            registerBtnText() {
                return this.userIsRegistered ? 'Unregister' : 'Register'
            },
            userIsRegistered() {
                return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
                    return meetupId === this.meetupId
                }) >= 0
            }
        },
        data() {
            return {
                dialog: false,
            }
        },
        methods: {
            onAgree() {
                if(this.userIsRegistered) {
                    this.$store.dispatch('unregisterUserFromMeetup', this.meetupId)
                } else {
                    this.$store.dispatch('registerUserForMeetup', this.meetupId)
                }
            }
        }
    }
</script>

<style scoped>

</style>
