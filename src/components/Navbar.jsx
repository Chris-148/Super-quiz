import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
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
      </ul>
      <form className="d-flex">
        <input className="form-control me-sm-2" type="search" placeholder="Search"/>
        <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
    </>
    )
}
