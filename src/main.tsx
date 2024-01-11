import React from 'react'
import ReactDOM from 'react-dom/client'

import { store, persistor } from './store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { UserProvider } from './context/userProvider'

import './styles/index.scss'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import SignIn from './pages/SignIn/SignIn'
import Chats from './pages/Chats/Chats'
import Chat from './pages/Chats/Chat'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="/">
          <UserProvider>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/chats/:id" element={<Chat />} />
            </Routes>
          </UserProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
