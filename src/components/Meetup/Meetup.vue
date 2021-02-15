<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card light>
                    <v-card-title>
                        <h4 class="primary--text">{{ meetup.title }}</h4>
                    </v-card-title>
                    <v-img
                            height="430px"
                            :src="meetup.imageUrl"
                    ></v-img>
                    <v-card-subtitle class="blue--text">{{ meetup.date | date }} - {{ meetup.location }}</v-card-subtitle>
                    <v-card-text>
                        {{ meetup.description }}
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="primary">
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
            }
        }
    }
</script>

<style scoped>

</style>
