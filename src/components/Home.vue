<template>
    <v-container>
        <v-row>
            <v-col class="text-sm-right col-12 col-sm-6 text-center">
                <v-btn color="primary" dark router to="/meetups" large>Explore Meetups</v-btn>
            </v-col>
            <v-col class="text-sm-left col-12 col-sm-6 text-center">
                <v-btn color="info" dark router to="/meetup/new" large>Organize Meetup</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-carousel
                        class="cursor-pointer"
                        cycle
                        hide-delimiter-background
                        show-arrows-on-hover>
                    <v-carousel-item
                            v-for="meetup in meetups"
                            :key="meetup.id"
                            :src="meetup.imageUrl"
                            reverse-transition="fade-transition"
                            @click="onLoadMeetup(meetup.id)"
                            transition="fade-transition">
                        <v-row class="fill-height pb-38-px" align="end" justify="center">
                            <div class="title display-3 white--text">{{ meetup.title }}</div>
                        </v-row>
                    </v-carousel-item>
                </v-carousel>
            </v-col>
        </v-row>
        <v-row row wrap class="mt-6">
            <v-col class="text-sm-center">
                <p>Join our awesome meetups!</p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Home",
        computed: {
            meetups() {
                return this.$store.getters.featuredMeetups
            }
        },
        methods: {
            onLoadMeetup(id) {
                this.$router.push('/meetups/'+id)
            }
        }
    }
</script>

<style scoped>
    .title {
        background-color: rgba(0, 0, 0, 0.5);
        padding: 20px;
        font-size: 2em;
    }
</style>
