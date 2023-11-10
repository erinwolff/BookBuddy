import bookLogo from './assets/books.gif'
import { Outlet } from 'react-router-dom'
import Navigations from './components/Layout/Navigations'

function App() {

  return (
    <>
      <header>
        <h1 className="title"><img id='logo-image' src={bookLogo} />Library App</h1>
        <Navigations />
      </header>
      <main>
        <Outlet />
      </main>

    </>
  )
}

export default App
