<template>
    <v-container>
        <v-row v-if="error">
            <v-col cols="12" sm="6" offset-sm="3">
                <app-alert :text="error.message" @dismissed="onDismissed"></app-alert>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
                <v-card>
                    <v-container>
                        <v-form ref="form" @submit.prevent="onSignUp">
                            <v-row>
                                <v-col>
                                    <v-text-field
                                            name="email"
                                            label="Mail"
                                            id="email"
                                            v-model="email"
                                            :rules="[rules.required, rules.email]"
                                            type="email"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-text-field
                                            name="password"
                                            label="Password"
                                            id="password"
                                            v-model="password"
                                            type="password"
                                            :rules="[rules.required]"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-text-field
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            id="confirmPassword"
                                            v-model="confirmPassword"
                                            type="password"
                                            :rules="[rules.required, comparePasswords]"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="text-right">
                                    <v-btn
                                            :loading="loading"
                                            :disabled="loading"
                                            type="submit">Sign up</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Signup",
        data() {
            return {
                email: '',
                password: '',
                confirmPassword: '',
                rules: {
                    required: value => !!value || 'Required.',
                    email: value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return pattern.test(value) || 'Invalid e-mail.'
                    }
                }
            }
        },
        computed: {
            comparePasswords() {
                return this.password !== this.confirmPassword ? 'Password do not match' : true
            },
            user() {
                return this.$store.getters.user
            },
            error() {
                return this.$store.getters.error
            },
            loading() {
                return this.$store.getters.loading
            }
        },
        watch: {
            user(value) {
                if(value !== null && value !== undefined){
                    this.$router.push('/')
                }
            }
        },
        methods: {
            onSignUp() {
                this.$store.dispatch('signUserUp',{
                    email: this.email,
                    password: this.password
                })
            },
            onDismissed() {
                this.$store.dispatch('clearError')
            }
        },
    }
</script>

<style scoped>

</style>
