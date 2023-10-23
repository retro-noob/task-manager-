import React ,{useState} from 'react'
import { useNavigate} from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
  let navigate=useNavigate();
  const handleSubmit= async (e)=>{
    e.preventDefault();
 const   {name,email,password} = credentials; 
    const response = await  fetch(" http://localhost:8080/api/auth/createuser", {
      
       method: 'POST', 
       headers: {
         'Content-Type': 'application/json',
     },
     body: JSON.stringify({name,email,password}) 
   });
   const json = await response.json()
   console.log(json);
   if (json.success){
     //save the auth token 
     localStorage.setItem('token',json.authtoken);
     navigate("/");
     props.showAlert("Account Created Successfully","success")
   }
   else{
    props.showAlert("invalid Credentials","danger");
   }
      

}
const onChange = (e) => {  
   setCredentials({ ...credentials, [e.target.name]: e.target.value })
 } 


  return (
    <div className='container'>
      <form onSubmit={handleSubmit} >

      <div className="form-group">
    <label htmlFor="exampleInputEmail1">Name</label>

    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter Your Name" name='name'/>
  </div>

  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>

    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email" name='email'/>
  </div>

  <div className="form-group">
    <label htmlFor="password">Password</label>

    <input type="password" className="form-control" id="password" onChange={onChange} placeholder="Password" name='password'  minLength={5} required/>
  </div>

  
  <div className="form-group">
    <label htmlFor="cpassword"> Confirm Password</label>

    <input type="password" className="form-control" id="cpassword" onChange={onChange} placeholder="Password" name='cpassword' minLength={5} required/>
  </div>

   


  <button type="submit" className="btn btn-primary">Submit</button>

</form>
    </div>
  )
}

export default Signup