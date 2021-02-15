<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
                <h3 class="primary--text">Create a new Meetup</h3>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
                <v-form ref="form" v-model="valid">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                    name="title"
                                    label="Title"
                                    id="title"
                                    v-model="title"
                                    :rules="[rules.required]"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                    name="location"
                                    label="Location"
                                    id="location"
                                    v-model="location"
                                    :rules="[rules.required]"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                    name="imageUrl"
                                    label="imageUrl"
                                    id="imageUrl"
                                    v-model="imageURL"
                                    :rules="[rules.required]"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-img :src="imageURL" height="100px"></v-img>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col
                                cols="12"
                        >
                            <v-dialog
                                    ref="dialog"
                                    v-model="modal"
                                    :return-value.sync="date"
                                    persistent
                                    width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                            v-model="date"
                                            label="Picker in dialog"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                            :rules="[rules.required]"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                        v-model="date"
                                        scrollable
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                            text
                                            color="primary"
                                            @click="modal = false"
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                            text
                                            color="primary"
                                            @click="$refs.dialog.save(date)"
                                    >
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-menu
                                    ref="menu"
                                    v-model="menu2"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    :return-value.sync="time"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                            v-model="time"
                                            label="Picker in menu"
                                            prepend-icon="mdi-clock-time-four-outline"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                            :rules="[rules.required]"
                                    ></v-text-field>
                                </template>
                                <v-time-picker
                                        v-if="menu2"
                                        v-model="time"
                                        ampm-in-title
                                        format="24hr"
                                        full-width
                                        @click:minute="$refs.menu.save(time)"
                                ></v-time-picker>
                            </v-menu>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-textarea
                                    name="description"
                                    label="Description"
                                    id="description"
                                    v-model="description"
                                    :rules="[rules.required]"></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-btn
                                    color="error"
                                    class="float-left rounded-0"
                                    @click="reset"
                            >
                                Reset
                            </v-btn>
                            <v-btn
                                    color="primary"
                                    class="float-right rounded-0"
                                    @click="onCreateMeetup"
                                    :disabled="!valid">
                                Create Meetup
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {v4 as uuidv4} from 'uuid';

    export default {
        name: "CreateMeetup",
        data: () => {
            return {
                date: new Date().toISOString().substr(0, 10),
                time: new Date().getUTCHours() + ':' + new Date().getUTCMinutes(),
                menu2: false,
                modal: false,
                title: '',
                location: '',
                imageURL: '',
                description: '',
                valid: false,
                rules: {
                    required: value => !!value || 'Required.',
                    counter: value => value.length <= 20 || 'Max 20 characters',
                    email: value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return pattern.test(value) || 'Invalid e-mail.'
                    },
                }
            }
        },
        computed: {
            submittableDateTime() {
                let date = new Date(this.date)
                if (typeof this.time === 'string') {
                    date.setHours(this.time.match(/^(\d+)/)[1])
                    date.setMinutes(this.time.match(/:(\d+)/)[1])
                } else {
                    date.setHours(this.time.getUTCHours())
                    date.setMinutes(this.time.getUTCMinutes())
                }
                console.log(date)
                return date;
            },
        },
        methods: {
            onCreateMeetup() {
                if (!this.$refs.form.validate()) {
                    return false;
                }
                const meetupData = {
                    id: uuidv4(),
                    title: this.title,
                    location: this.location,
                    imageUrl: this.imageURL,
                    description: this.description,
                    date: this.submittableDateTime
                }
                this.$store.dispatch('createMeetup', meetupData)
                this.$router.push('/meetups')
            },
            reset() {
                this.$refs.form.reset()
            },
            resetValidation() {
                this.$refs.form.resetValidation()
            },
        }
    }
</script>

<style scoped>

</style>
