import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import store from './helpers/store.ts'
import { Provider } from 'react-redux'
import { fetchUsers } from './helpers/users/UsersSlice.ts'

store.dispatch(fetchUsers())

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
