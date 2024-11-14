import React, { useEffect } from 'react';
import { Link, useLocation ,useNavigate} from 'react-router-dom';

const Navbar = () => {
  let location = useLocation();
  const navigate= useNavigate();

  const hadleLogout= ()=>{
    localStorage.removeItem('token');
    navigate("/login")
  }

  useEffect(() => {
    console.log(location.pathname)
  }, [location])
  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
      
        <Link className="navbar-brand" to="/">Task-management</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li>


          </ul>
          {!localStorage.getItem('token')?
         
          <form className="d-flex ms-auto">
            <Link className="btn btn-primary me-2" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary" to="/signup" role="button">Signup</Link>
          </form>: <button onClick={hadleLogout} className='d-flex ms-auto btn btn-primary'>Logout</button>
          }
          </div>

        

      </div>
      
    </nav> 


  );
}

export default Navbar;
