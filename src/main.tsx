import React from 'react'
import ReactDOM from 'react-dom/client'

import { store, persistor } from './store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import './styles/index.scss'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import SignIn from './pages/SignIn/SignIn'
import Chats from './pages/Chats/Chats'

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/chats",
    element: <Chats />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
