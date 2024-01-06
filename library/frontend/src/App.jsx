import './App.css'
import { Link } from 'react-router-dom'

function App() {
  return (
    <>
      <h1>Welcome to the Novi Sad library portal</h1>
      <div className="card">
        <li>
          <Link to={"register"}>Register</Link>
        </li>
        <li>
          <Link to={"borrow"}>Borrow</Link>
        </li>
      </div>
    </>
  )
}

export default App
