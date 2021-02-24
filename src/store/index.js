import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [],
        user: null,
        loading: false,
        error: null
    },
    mutations: {
        registerUserForMeetup(state, payload) {
            const id = payload.id
            if(state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0) {
                return
            }
            state.user.registeredMeetups.push(id)
            state.user.fbKeys[id] = payload.fbKey
        },
        unregisterUserFromMeetup(state, payload) {
            const registeredMeetups = state.user.registeredMeetups
            registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1)
            Reflect.deleteProperty(state.user.fbKeys, payload)
        },
        setLoadedMeetups(state, payload) {
            state.loadedMeetups = payload
        },
        createMeetup(state, payload) {
            state.loadedMeetups.push(payload);
        },
        updateMeetup(state, payload) {
            const meetup = state.loadedMeetups.find(meetup => {
                return meetup.id === payload.id
            })
            if(payload.title) {
                meetup.title = payload.title
            }
            if(payload.description) {
                meetup.description = payload.description
            }
            if(payload.date) {
                meetup.date = payload.date
            }
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
        registerUserForMeetup({commit, getters}, payload){
            commit('setLoading', true)
            const user = getters.user
            firebase.database().ref("/users/" + user.id).child('/registrations/')
                .push(payload)
                .then(data => {
                    commit('registerUserForMeetup', {id: payload, fbKey: data.key})
                    commit('setLoading', false)
                })
                .catch(err => {
                    console.log(err)
                    commit('setLoading', false)
                })
        },
        unregisterUserFromMeetup({commit, getters}, payload) {
            commit('setLoading', true)
            const user = getters.user
            if(!user.fbKeys){
                return
            }
            const fbKey = user.fbKeys[payload]
            firebase.database().ref("/users/" + user.id + '/registrations/').child(fbKey)
                .remove()
                .then(() => {
                    commit('unregisterUserFromMeetup', payload)
                    commit('setLoading', false)
                })
                .catch(err => {
                    console.log(err)
                    commit('setLoading', false)
                })
        },
        loadMeetups({commit}) {
            commit('setLoading', true)
            firebase.database().ref('meetups').once('value')
                .then(data => {
                    const meetups = []
                    const obj = data.val()
                    for (let key in obj) {
                        meetups.push({
                            id: key,
                            title: obj[key].title,
                            description: obj[key].description,
                            imageUrl: obj[key].imageUrl,
                            date: obj[key].date,
                            location: obj[key].location,
                            creatorId: obj[key].creatorId
                        })
                    }
                    commit('setLoadedMeetups', meetups)
                    commit('setLoading', false)
                })
                .catch(error => {
                    console.log(error)
                    commit('setLoading', false)
                })
        },
        createMeetup({commit}, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                description: payload.description,
                date: payload.date.toLocaleString(),
                creatorId: this.getters.user.id
            }
            let imageUrl
            let key
            firebase.database().ref('meetups').push(meetup)
                .then(data => {
                    key = data.key
                    return key
                })
                .then(key => {
                    // const filename = payload.imageUrl.name
                    // const ext = filename.slice(filename.lastIndexOf('.'))
                    return firebase.storage().ref('meetups/' + key).put(payload.imageUrl);

                })
                .then((fileData) => {
                    fileData.ref.getDownloadURL()
                        .then((downloadUrl) => {
                            imageUrl = downloadUrl
                            firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
                        })
                        .then(() => {
                            commit('createMeetup', {
                                ...meetup,
                                imageUrl: imageUrl,
                                id: key
                            })
                        })
                })
                .catch(error => {
                    console.log(error)
                })
        },
        updateMeetup({commit}, payload) {
            commit('setLoading', true)
            const updateObj = {}
            if(payload.title) {
                updateObj.title = payload.title
            }
            if(payload.title) {
                updateObj.description = payload.description
            }
            if(payload.date) {
                updateObj.date = payload.date
            }

            firebase.database().ref('meetups').child(payload.id).update(updateObj)
                .then(() => {
                    commit('setLoading', false)
                    commit('updateMeetup', payload)
                })
                .catch(err => {
                    console.log(err)
                    commit('setLoading', false)
                })
        },
        signUserUp({commit}, payload) {
            commit('setLoading', true)
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then((userCredential) => {
                    commit('setLoading', false)
                    commit('clearError')
                    let user = userCredential.user;
                    console.log(userCredential)
                    commit('setUser', {
                        id: user.uid,
                        registeredMeetups: [],
                        fbKeys: {}
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
        autoSignIn({commit}, payload) {
            commit('setUser', {id: payload.uid, registeredMeetups: [], fbKeys: {}})
        },
        logout({commit}) {
            firebase.auth().signOut()
            commit('setUser', null)
        },
        clearError({commit}) {
            commit('clearError')
        }
    },
    getters: {
        loadedMeetups(state) {
            return state.loadedMeetups.sort((meetupA, meetupB) => {
                return meetupA.date > meetupB.date
            })
        },
        featuredMeetups(state, getters) {
            return getters.loadedMeetups.slice(0, 5)
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
