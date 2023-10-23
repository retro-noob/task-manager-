import React from 'react'
import {Link, useLocation} from "react-router-dom";



const Navbar = () => {


  const handleLogout=()=>{
     localStorage.removeItem('token');
    
  }


    let location=useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/"> Task App </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/"?"active":""}`} to="/">Write Something</Link>
          </li>
     
        
        
        </ul>
        {!localStorage.getItem('token')?
        <form className="d-flex" role="search">

        <Link className='btn btn-primary mx-1' to="/login" role="button" >Login</Link>

          
        <Link className='btn btn-primary mx-1' to="/signup" role="button" >Sign Up</Link>
        </form>:<Link to="/login" onClick ={handleLogout}className="btn btn-primary">Logout</Link>}
      </div>
    </div>
    <style jsx>{`
        .navbar {
          font-family: 'Arial', sans-serif;
        }

        .navbar-brand {
          font-family: 'Your Custom Font', sans-serif;
          font-size: 24px;
          font-weight: bold;
        }

        .nav-link {
          font-family: 'Your Custom Font', sans-serif;
          font-size: 18px;
        }

        .btn {
          font-family: 'Your Custom Font', sans-serif;
          font-size: 16px;
        }
      `}</style>
  </nav>
 
  )
}

export default Navbar 