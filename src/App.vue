<template>
    <v-app dark>
        <v-navigation-drawer
                v-model="drawer"
                :mini-variant="miniVariant"
                :clipped="clipped"
                fixed
                absolute
                temporary
                app
        >
            <v-list>
                <v-list-item
                        v-for="(item, i) in items"
                        :key="i"
                        :to="item.to"
                        router
                        exact
                >
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"/>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item
                        v-if="userIsAuthenticated"
                        @click="onLogout"
                >
                    <v-list-item-action>
                        <v-icon>mdi-logout</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar
                dark
                dense
                flat
                :clipped-left="clipped"
                fixed
                color="primary"
                app
        >
            <v-app-bar-nav-icon
                    class="hidden-md-and-up"
                    @click.stop="drawer = !drawer"/>
            <v-toolbar-title>
                <router-link class="cursor-pointer" to="/"><span class="white--text">{{title}}</span></router-link>
            </v-toolbar-title>
            <v-spacer class="hidden-sm-and-down"/>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn
                        v-for="(item, i) in items"
                        :key="i"
                        :to="item.to"
                        :title="item.title"
                        text
                        exact
                        router
                >
                    <v-icon left>{{ item.icon }}</v-icon>
                    {{ item.title }}
                </v-btn>
                <v-btn
                        v-if="userIsAuthenticated"
                        @click="onLogout"
                        text
                >
                    <v-icon left>mdi-logout</v-icon>
                    Logout
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>
        <v-main>
            <v-container>
                <router-view></router-view>
            </v-container>
        </v-main>
        <v-footer
                :absolute="!fixed"
                app
        >
            <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>
</template>

<script>
    export default {
        data() {
            return {
                clipped: false,
                drawer: false,
                fixed: false,
                miniVariant: false,
                title: 'DevMeetup'
            }
        },
        computed: {
            items() {
                if (this.userIsAuthenticated) {
                    return [
                        {icon: 'mdi-account-supervisor', title: 'View Meetups', to: '/meetups'},
                        {icon: 'mdi-google-classroom', title: 'Organize Meetups', to: '/meetup/new'},
                        {icon: 'mdi-account', title: 'Profile', to: '/profile'},
                    ]
                } else {
                    return [
                        {icon: 'mdi-account-plus', title: 'Sign Up', to: '/signup'},
                        {icon: 'mdi-login', title: 'Sign In', to: '/signin'},
                    ]
                }
            },
            userIsAuthenticated() {
                return this.$store.getters.user !== null && this.$store.getters !== undefined
            }
        },
        methods: {
            onLogout(){
                this.$store.dispatch('logout')
            }
        }
    }
</script>
