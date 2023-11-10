import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider } from 'react-redux'
import store from './store/store.js'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Books from './components/Books/Books.jsx'
import SingleBook from './components/Books/SingleBook.jsx'
import Login from './components/Auth/Login.jsx'
import Account from './components/Profile/Account.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Books /> },
      { path: 'books', element: <Books /> },
      { path: 'books/:id', element: <SingleBook /> },
      { path: 'login', element: <Login /> },
      { path: 'account', element: <Account /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
