import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navbar } from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
     <div className="container-fluid border border-success">
        <h1 className="my-4 text-center">Quizz Test</h1>
        <div className="row text-center">
              <div className="col">test</div>
              <div className="col">test</div>
              <div className="col">test</div>
              <div className="col">test</div>
              <div>
              <button className="btn btn-light btn-sm">button</button>
              </div>
        </div>
     </div>
    </>
  )
}

export default App
