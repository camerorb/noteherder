import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';
import base from './base'
import SignIn from './SignIn'
import Main from './Main'
import { PublicRoute, PrivateRoute } from './RouteHelpers'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uid: null,
      notes: [],
    }
  }

  componentWillMount() {
    this.getUserFromLocalStorage()
    base.onAuth((user) => {
      if (user) {
        this.authHandler(null, { user });
      } else {
        this.signOut()
      }
    })
  }

  getUserFromLocalStorage = () => {
    const uid = localStorage.getItem('uid')
    if (!uid) return
    this.setState({ uid })
  }

  authHandler = (err, authData) => {
    if (err) {
      console.error(err);
      return;
    }
    this.setState({
      uid: authData.user.uid,
    })
    localStorage.setItem('uid', authData.user.id)
    this.setupNotes()
  }

  authed = () => {
    return !!this.state.uid
  }

  signOut = () => {
    base.unauth()
    this.setState({ uid: null })
    localStorage.removeItem('uid')
  }

  setupNotes = () => {
    if (!this.state.uid) return
    this.ref = base.syncState(
      `${this.state.uid}/notes`,
      {
        context: this,
        state: 'notes',
      }
    )
  }

  saveNote = (note) => {
    const timestamp = Date.now()
    let shouldRedirect = false
    if (!note.id) {
      note.id = `note-${timestamp}`
      shouldRedirect = true
    }
    note.updated = timestamp
    const notes = {...this.state.notes}
    notes[note.id] = note
    this.setState({ notes })
    if (shouldRedirect) {
      this.props.history.push(`/notes/${note.id}`)
    }
  }

  removeNote = (note) => {
    console.log('remove')
    const notes = {...this.state.notes}
    notes[note.id] = null
    this.setState({ notes })
    this.props.history.push('/notes')
  }

  render() {
    const actions = {
      signOut: this.signOut,
      saveNote: this.saveNote,
      removeNote: this.removeNote,
    }
    return (
      <div className="App container wrap">
        <Switch>
          <PrivateRoute path="/notes" authed={this.authed()} render={() => (
            <Main {...actions} notes={this.state.notes} />
          )} />
          <PublicRoute path="/sign-in" authed={this.authed()} render={() => (
            <SignIn authHandler={this.authHandler} />
          )} />
          <Route render={() => <Redirect to="/notes" />} />
        </Switch>
      </div>
    );
  }
}

export default App;
