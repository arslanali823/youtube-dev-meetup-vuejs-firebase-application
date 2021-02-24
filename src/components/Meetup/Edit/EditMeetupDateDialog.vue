<template>
    <v-dialog
            transition="dialog-top-transition"
            max-width="300"
            v-model="dialog"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                    dark
                    x-small
                    class="rounded-0"
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
            >
                Edit Date
            </v-btn>
        </template>
        <template v-slot:default="dialog">
            <v-card>
                <v-toolbar
                        color="primary"
                        dark
                >Edit Meetup Date
                </v-toolbar>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col
                                    cols="12"
                            >
                                <v-date-picker v-model="editableDate" full-width no-title/>
                                <template>
                                    <v-btn
                                            color="primary"
                                            dark
                                            x-small
                                            @click.native="onSaveChanges"
                                            class="rounded-0 float-right"
                                    >Save
                                    </v-btn>
                                    <v-btn
                                            color="default"
                                            class="rounded-0 mr-1 float-right"
                                            dark
                                            x-small
                                            @click="dialog.value = false"
                                    >Close
                                    </v-btn>
                                </template>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </template>
    </v-dialog>
</template>

<script>
    export default {
        name: "EditMeetupDateDialog",
        props: ['meetup'],
        data() {
            return {
                dialog: false,
                editableDate: null
            }
        },
        methods: {
            onSaveChanges() {
                let newDate = new Date(this.meetup.date)
                const newDay = new Date(this.editableDate).getUTCDate()
                const newMonth = new Date(this.editableDate).getUTCMonth()
                const newYear = new Date(this.editableDate).getUTCFullYear()

                newDate.setUTCDate(newDay)
                newDate.setUTCMonth(newMonth)
                newDate.setUTCFullYear(newYear)

                this.$store.dispatch('updateMeetup', {id: this.meetup.id, date: newDate})

                this.dialog = false
            }
        },
        created() {
            this.editableDate = new Date(this.meetup.date).toISOString()
        }
    }
</script>

<style scoped>

</style>
