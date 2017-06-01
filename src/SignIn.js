import React from 'react'

import './SignIn.css'
import base from './base'
import Header from './Header'

const SignIn = ({ authHandler }) => {
  const authenticate = (provider) => {
    base.authWithOAuthPopup(provider, authHandler)
  }

  return (
    <div className="SignIn container">
      <Header authed={false} />
      <main>
        <div>
          <h3>Hey, Nerd! You Like Notes?</h3>
          <p>
            You never know when you'll need to write crap down. In fact,
            you should probably be taking notes right now.
          </p>
          <button className="github btn btn-default" onClick={() => authenticate('github')}>
            <i className="fa fa-github"></i>
            {' '}
            <span>Sign In With GitHub</span>
          </button>
        </div>
      </main>
    </div>
  )
}

export default SignIn