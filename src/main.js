import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import '../src/assets/css/custom.css'
import AlertComponent from './components/Shared/Alert'

import router from './router'
import {store} from './store'
import firebase from "firebase/app"

import DateFilter from './filters/date'

Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertComponent)

const projectId = 'devmeetup-b2e73';
const firebaseConfig = {
  apiKey: 'AIzaSyCWfQGAFu5MKl59RWoBcHRuHHE9KkbAP5M',
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: 'https://devmeetup-b2e73-default-rtdb.firebaseio.com/',
  projectId: projectId,
  storageBucket: 'gs://devmeetup-b2e73.appspot.com/',
}

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created() {
    //initialize firebase
    firebase.initializeApp(firebaseConfig)
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }
}).$mount('#app')
