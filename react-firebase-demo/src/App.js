import './App.css'

import React from 'react'
import * as firebase from 'firebase'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      speed: 0,
      email:'',
      password:''
    }
  }

  componentDidMount() {
    this.loadDataBaseListener()
    this.realTimeUserListener()
  }

  loadDataBaseListener = () => {
    const rootRef = firebase.database().ref().child('react')
    const speedRef = rootRef.child('speed')
    speedRef.on('value', snap => {
        this.setState({
          speed:snap.val()
        })
    })
  }

  realTimeUserListener = () => {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {
        console.log('you are now loggend in')
        console.log(firebaseUser)
      } else {
        console.log('you are not loggen in')
      }
    })
  }

  logIn = () => {
    const email = this.state.email
    const pass = this.state.password
    const auth = firebase.auth()
    const promise = auth.signInWithEmailAndPassword(email, pass)
    promise.catch(e => console.log(e.message))
  }

  signUp = () => {
    const email = this.state.email
    const pass = this.state.password
    const auth = firebase.auth()
    const promise = auth.createUserWithEmailAndPassword(email, pass)
    promise.catch(e => console.log(e.message))
  }

  logOut = () => {
   firebase.auth().signOut()
  }

  handleInputChange = (event) => {
    let id = event.target.id
    if( id === 'email' ) {
      this.setState({
        email:event.target.value
      })
    }

    if(id === 'password') {
       this.setState({
        password:event.target.value
      })
    }
  }

  render () {
    return(
      <div>
        <h1>React Firebase App</h1>
        <button onClick={this.logIn}>Log In</button>
        <button onClick={this.signUp}>Sign Up</button>
        <button onClick={this.logOut}>Log out</button>
        <p>Counter Value: {this.state.speed}</p>
        <div className="login_area">
          <label htmlFor="email">Email:</label>
          <input id="email" type="text" onChange={this.handleInputChange} />
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" onChange={this.handleInputChange} />
        </div>
      </div>
    )
  }
}

export default App
