import React from 'react'

import quill from './quill.svg'

const Header = ({ authed, signOut }) => {
  return (
    <header>
      <img src={quill} alt=""/>
      <span className="title">Noteherder</span>
    </header>
  )
}

export default Header