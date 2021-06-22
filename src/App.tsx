import { type } from 'os'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'
import {firebase, auth} from './services/firebase'


import { AuthContextProvider } from './contexts/AuthContext'

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
