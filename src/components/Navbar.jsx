import { useState, useEffect } from "react";
import { NavLink, useLocation } from 'react-router-dom'
import coq from "/src/images/Coq.png"
export const Navbar = () => {
  const [isChecked, setIsChecked] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setIsChecked(false);
  }, [location.pathname]);
  return (
    <>
    {/* <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Super Quiz</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav me-auto">
        
        <li className="nav-item">
          <NavLink className="nav-link active" to={'/'}>Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={"/questions"}>Questions</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={"/questions/form"}>Question Form</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={"/quiz/1"}>Game Screen</NavLink>
        </li> */}
        {/* <li className="nav-item dropdown">
          <NavLink className="nav-link dropdown-toggle" data-bs-toggle="dropdown" to="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</NavLink>
          <div className="dropdown-menu">
            <NavLink className="dropdown-item" to="#">Action</NavLink>
            <NavLink className="dropdown-item" to="#">Another action</NavLink>
            <NavLink className="dropdown-item" to="#">Something else here</NavLink>
            <div className="dropdown-divider"></div>
            <NavLink className="dropdown-item" to="#">Separated link</NavLink>
          </div>
        </li> */}
      {/* </ul>
    </div>
  </div>
</nav> */}
<nav>
      <div className="navbar">
        <div className="nav-container">
            <input className="checkbox" type="checkbox" name="" id="" checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}/>
            <div className="hamburger-lines">
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div> 
          {/* <div className="img-logo"><img src={coq} alt="" /></div>  */}
          <div className="logo">
            
            <h1>Call of Quiz</h1>
          </div>
          <div className="menu-items">
            <li><NavLink  to={'/'}>Create Quiz
            </NavLink></li>
            <li><NavLink  to={"/questions"}>Questions Data</NavLink></li>
            <li><NavLink  to={"/questions/form"}>Add Question</NavLink></li>
            <li><NavLink  to={"/quiz/all"}>Compete / See other Quiz</NavLink></li>
            <li><NavLink to={"/about"}>About</NavLink></li>
          </div>
        </div>
      </div>
    </nav>
    </>
    )
}
