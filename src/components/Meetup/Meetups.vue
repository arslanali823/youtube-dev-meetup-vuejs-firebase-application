<template>
    <v-container>
        <v-row v-for="meetup in meetups" :key="meetup.id" class="mb-2">
            <v-col sm="10" cols="8" offset-sm="1" offset="2">
                <v-card class="info">
                    <v-container fluid>
                        <v-row>
                            <v-col sm="4" md="3" lg="3" xl="3">
                                <v-img
                                        :src="meetup.imageUrl"
                                        height="130px">
                                </v-img>
                            </v-col>
                            <v-col sm="8" md="9" lg="9" xl="9" class="pt-0">
                                <v-card-title class="pb-0 white--text" v-text="meetup.title"></v-card-title>
                                <v-card-text> {{ meetup.date | date }}</v-card-text>
                                <v-card-actions>
                                    <v-btn :to="'meetups/'+meetup.id">
                                        <v-icon left light>mdi-arrow-right</v-icon>
                                        View Meetup
                                    </v-btn>
                                </v-card-actions>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Meetups",
        computed: {
            meetups() {
                return this.$store.getters.featuredMeetups
            }
        }
    }
</script>

<style scoped>

</style>
