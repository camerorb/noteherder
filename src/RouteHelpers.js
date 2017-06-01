import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export function PrivateRoute({component: Component, render, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed
        ? (render && render()) || <Component {...props} />
        : <Redirect to={{pathname: '/sign-in', state: {from: props.location}}} />}
    />
  )
}

export function PublicRoute({component: Component, render, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => !authed
        ? (render && render()) || <Component {...props} />
        : <Redirect to='/notes' />}
    />
  )
}