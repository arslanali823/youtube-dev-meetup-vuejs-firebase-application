import Vue from 'vue'
import Vuex from 'vuex'
import {v4 as uuidv4} from 'uuid'
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [
            {
                id: uuidv4(),
                title: 'Meetup in New York',
                imageUrl: 'https://www.befunky.com/images/prismic/8e6aa235-e32e-4e4a-a9fd-6e404778f9d6_features-stock-images.png?auto=webp&format=jpg&width=581',
                date: new Date(),
                location: 'New York',
                description: 'Its New York'
            },
            {
                id: uuidv4(),
                title: 'Meetup in Islamabad',
                imageUrl: 'https://www.w3schools.com/howto/img_nature_wide.jpg',
                date: new Date(),
                location: 'Islamabad',
                description: 'Its Islamabad'
            },
            {
                id: uuidv4(),
                title: 'Meetup in Lahore',
                imageUrl: 'https://www.johnryder.co.uk/wp-content/uploads/2014/08/sample-slider.jpg',
                date: new Date(),
                location: 'Lahore',
                description: 'Its Lahore'
            },
            {
                id: uuidv4(),
                title: 'Meetup in Karachi',
                imageUrl: 'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg',
                date: new Date(),
                location: 'Karachi',
                description: 'Its Karachi'
            }
        ],
        user: null,
        loading: false,
        error: null
    },
    mutations: {
        createMeetup(state, payload) {
            state.loadedMeetups.push(payload);
        },
        setUser(state, payload) {
            state.user = payload
        },
        setLoading(state, payload) {
            state.loading = payload
        },
        setError(state, payload) {
            state.error = payload
        },
        clearError(state) {
            state.error = null
        }
    },
    actions: {
        createMeetup({commit}, payload) {
            const meetup = {
                id: payload.id,
                title: payload.title,
                location: payload.title,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date
            }

            // Reach out to firebase and store it
            commit('createMeetup', meetup)
        },
        signUserUp({commit}, payload) {
            commit('setLoading', true)
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then((userCredential) => {
                    commit('setLoading', false)
                    let user = userCredential.user;
                    console.log(userCredential)
                    commit('setUser', {
                        id: user.uid,
                        registeredMeetups: []
                    })
                })
                .catch((error) => {
                    commit('setLoading', false)
                    commit('setError', error)
                    let errorCode = error.code
                    let errorMessage = error.message
                    console.log(errorCode, errorMessage)
                })
        },
        signUserIn({commit}, payload) {
            commit('setLoading', true)
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then((userCredential) => {
                    commit('setLoading', false)
                    let user = userCredential.user
                    commit('setUser', {
                        id: user.uid,
                        registeredMeetups: []
                    })
                })
                .catch((error) => {
                    commit('setLoading', false)
                    commit('setError', error)
                    let errorCode = error.code
                    let errorMessage = error.message
                    console.log(errorCode, errorMessage)
                })
        },
        clearError({commit}) {
            commit('clearError')
        }
    },
    getters: {
        loadedMeetups(state){
            return state.loadedMeetups.sort((meetupA, meetupB) => {
                return meetupA.date > meetupB.date
            })
        },
        featuredMeetups(state, getters) {
            return getters.loadedMeetups.slice(0,5)
        },
        loadedMeetup(state) {
            return (meetupId) => {
                return state.loadedMeetups.find((meetup) => {
                    return meetup.id === meetupId
                })
            }
        },
        user: state => state.user,
        error: state => state.error,
        loading: state => state.loading,
    }
})
