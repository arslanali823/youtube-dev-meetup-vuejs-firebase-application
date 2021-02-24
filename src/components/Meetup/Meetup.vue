<template>
    <v-container>
        <v-row v-if="loading">
            <v-col class="text-center">
                <v-progress-circular
                        indeterminate
                        color="primary"
                        :width="7"
                        :size="70"
                        v-if="loading"
                ></v-progress-circular>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col>
                <v-card light>
                    <v-card-title>
                        <h4 class="primary--text">{{ meetup.title }}</h4>
                        <template v-if="userIsCreator">
                            <v-spacer></v-spacer>
                            <app-edit-meetup :meetup="meetup"></app-edit-meetup>
                        </template>
                    </v-card-title>
                    <v-img
                            height="430px"
                            :src="meetup.imageUrl"
                    ></v-img>
                    <v-card-subtitle class="blue--text">{{ meetup.date | date }} - {{ meetup.location }}</v-card-subtitle>
                    <div>
                        <app-edit-meetup-date v-if="userIsCreator" :meetup="meetup"></app-edit-meetup-date>
                        <app-edit-meetup-time v-if="userIsCreator" :meetup="meetup"></app-edit-meetup-time>
                    </div>
                    <v-card-text>
                        {{ meetup.description }}
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                dark
                                color="primary"
                                class="rounded-0">
                            Register
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Meetup",
        computed: {
            meetup() {
                return this.$store.getters.loadedMeetup(this.$route.params.id) || {}
            },
            userIsAuthenticated() {
                return this.$store.getters.user !== null && this.$store.getters.user !== undefined
            },
            userIsCreator() {
                if(!this.userIsAuthenticated){
                    return false
                }

                return this.$store.getters.user.id === this.meetup.creatorId
            },
            loading() {
                return this.$store.getters.loading
            }
        }
    }
</script>

<style scoped>

</style>
