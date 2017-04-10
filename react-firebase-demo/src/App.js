import './App.css'

import React from 'react'
import * as firebase from 'firebase'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      speed: 1
    }
  }

  componentDidMount() {
    const rootRef = firebase.database().ref().child('react')
    const speedRef = rootRef.child('speed')
    speedRef.on('value', snap => {
        this.setState({
          speed:snap.val()
        })
    })
  }

  handleClick = () => {
    this.setState({
      speed: this.state.speed + 1
    })
  }

  render () {
    return(
      <div>
        <h1>React Firebase App</h1>
        <button onClick={this.handleClick}>Apasa</button>
        <p>Counter Value: {this.state.speed}</p>
      </div>
    )
  }
}

export default App
