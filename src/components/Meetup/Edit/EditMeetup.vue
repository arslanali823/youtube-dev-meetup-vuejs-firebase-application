<template>
    <v-dialog
            transition="dialog-top-transition"
            max-width="600"
            v-model="dialog"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                    fab
                    dark
                    small
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
            >
                <v-icon dark>
                    mdi-pencil
                </v-icon>
            </v-btn>
        </template>
        <template v-slot:default="dialog">
            <v-card>
                <v-toolbar
                        color="primary"
                        dark
                >Edit Meetup
                </v-toolbar>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col
                                    cols="12"
                            >
                                <v-text-field
                                        label="Title"
                                        name="title"
                                        id="title"
                                        v-model="editedTitle"
                                        required
                                ></v-text-field>
                                <v-textarea
                                        label="Description"
                                        name="description"
                                        rows="3"
                                        id="description"
                                        v-model="editedDescription"
                                        required
                                ></v-textarea>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-container>
                        <v-row>
                            <v-col class="text-right">
                                <v-btn
                                        class="mr-2"
                                        color="default"
                                        dark
                                        @click="dialog.value = false"
                                >
                                    Close
                                </v-btn>
                                <v-btn
                                        dark
                                        color="primary"
                                        @click="onSaveChanges"
                                        class="mr-1"
                                >
                                    Save
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script>
    export default {
        name: "EditMeetup",
        props: ['meetup'],
        data() {
            return {
                dialog: false,
                editedTitle: this.meetup.title,
                editedDescription: this.meetup.description
            }
        },
        methods: {
            onSaveChanges() {
                if (this.editedTitle.trim() === '' && this.editedDescription.trim() === '') {
                    return
                }
                this.$store.dispatch('updateMeetup', {
                    id: this.meetup.id,
                    title: this.editedTitle,
                    description: this.editedDescription
                })
                this.dialog = false
            }
        }
    }
</script>

<style scoped>

</style>
