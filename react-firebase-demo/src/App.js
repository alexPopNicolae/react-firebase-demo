import './App.css'

import React from 'react'
import * as firebase from 'firebase'
import _ from 'lodash'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      speed: 0,
      email:'',
      password:'',
      messages:[],
      textareaMessage:'',
      filteredMessages:[]
    }
  }


  handleTextArea = (e) => {
    this.setState({
      textareaMessage:e.target.value
    })
  }

  componentDidMount() {
    this.loadDataBaseListener()
    this.realTimeUserListener()
    this.loadAndDisplayMessages()
  }

  saveMessageToDb = () => {
    let fireRef = firebase.database().ref().child('react')
    let messRef = fireRef.child('messages')

    messRef.push().set({
      message:this.state.textareaMessage
    })

    let filteredMessages = this.state.filteredMessages
    filteredMessages.push(this.state.textareaMessage)
  
   this.setState({
     textareaMessage:'',
     filteredMessages:filteredMessages
   })
  }

  loadAndDisplayMessages = () => {
    let radRef = firebase.database().ref().child('react')
    let messagesRef = radRef.child('messages')
    messagesRef.on('value', dataSnapshot => {
      let messagesVal = dataSnapshot.val()
       let mess = []
      for (let prop in messagesVal) {
          let item = messagesVal[prop]
          mess.push(item.message)
      }
       this.setState({
         filteredMessages:mess
      })

    })
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
         <div className="login_area">
        <div className="buttons">
          <button onClick={this.logIn}>Log In</button>
          <button onClick={this.signUp}>Sign Up</button>
          <button onClick={this.logOut}>Log out</button>
        </div>
        <p>Speed Value: {this.state.speed}</p>
          <label htmlFor="email">Email:</label>
          <input id="email" type="text" onChange={this.handleInputChange} />
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" onChange={this.handleInputChange} />
        </div>
        <h1>Mesajele din baza de date sunt:</h1>
        <div className="messages">
           {
             
             this.state.filteredMessages.map((item, index)=>{
               return <p className="message">{item}</p>
             })
            
           }
        </div>
        <h1>Add a new message to database</h1>
        <div className="add_message">
          <textarea value={this.state.textareaMessage} onChange={this.handleTextArea}/>
          <button onClick={this.saveMessageToDb}>Add Message to DB</button>
        </div>
      </div>
    )
  }
}

export default App
