import './index.css'

import React from 'react'
import {render} from 'react-dom'
import * as firebase from 'firebase'

let config = {
    apiKey: "AIzaSyDt5bAn6RJqPzKpzj4uuaBWdBtUrPwAaq8",
    authDomain: "questionapp-294ad.firebaseapp.com",
    databaseURL: "https://questionapp-294ad.firebaseio.com",
    projectId: "questionapp-294ad",
    storageBucket: "questionapp-294ad.appspot.com",
    messagingSenderId: "310479518855"
  }

firebase.initializeApp(config)

import App from './App'

render(<App/>, document.querySelector('#app'))
