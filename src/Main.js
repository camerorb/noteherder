import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'

import './Main.css'
import quill from './quill.svg'
import NotesList from './NotesList'
import NoteForm from './NoteForm'

const UserLinks = ({ signOut }) => (
  <div className="UserLinks">
    <button onClick={signOut}>
      <i className="fa fa-sign-out"></i>
    </button>
  </div>
)

const Nav = ({ signOut }) => {
  return (
    <nav className="Nav">
      <div className="logo"><img src={quill} alt="Noteherder" /></div>
      <Link to="/notes">
        <button className="new-note"><span>+</span></button>
      </Link>
      <UserLinks signOut={signOut} />
    </nav>
  )
}

const Main = ({ signOut, ...otherProps }) => {
  return (
    <main className="Main">
      <Nav signOut={signOut} />
      <NotesList notes={otherProps.notes} />
      <Switch>
        <Route path="/notes/:id" render={(props) => <NoteForm {...props} {...otherProps} />} />
        <Route path="/notes" render={(props) => <NoteForm {...props} {...otherProps} />} />
      </Switch>
    </main>
  )
}

export default Main