import React, { useState  } from 'react';
import {useNavigate} from 'react-router-dom';

const Signup = () => {
    
    const [credentials, setCredentials] = useState({name:"",email: "" , password: "" , cpassword:""})
    let navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
       const {name, email, password} = credentials;
        
         
      const response = await fetch(`http://localhost:5000/api/auth/Createuser`,{

        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password})

      });
      const json = await response.json();
      console.log(json)

      if(json.success){

        localStorage.setItem('token' , json.authtoken);
        navigate("/")
      }
      else{
        alert("Invalid credentials")
      }
    }
    const onChange = (e)=>{
        setCredentials({...credentials , [e.target.name]: e.target.value})
    
    }




    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name= "email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} placeholder="Password" />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="cpassword">Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} placeholder="Conformed Password" />
                </div>
                <div className='my-3'>

                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;
