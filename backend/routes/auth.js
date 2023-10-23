const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');         //we would be learning how to send data to the request body.
const bcrypt=require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const JWT_SECRET="AnmolisKing";

// ROUTE:1    Create a user using POST "/api/auth/createuser" .doesnt require auth


router.post('/createuser',[
  body('name','Entera a valid name').isLength({ min: 3 }),
  body('email','Enter a valid Email').isEmail(),
  body('password','Password must be atleast 5 characters').isLength({ min: 5 }),
] , async(req,res)=>{
  let success=false;

                                                                                             //The save() function is used to save the document data into the database
  //if there are errore , return bad req and the error message
  
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }


  // check wether the user with this email exsist already

try{
  let user=await User.findOne({email:req.body.email});
  if(user){
    return res.status(400).json ({success, error: "sorry a user with this email already exsists"})
  }
  const salt = await bcrypt.genSalt(10);
 const secPass= await bcrypt.hash(req.body.password,salt) ; //req.body: It holds parameters that are sent up by the client as a part of the Post request

  //newuser
   user=await User.create({
    name: req.body.name,
    password: secPass, 
    email: req.body.email,
  });


  // .then(user => res.json(user))
  // .catch(err=> {console.log(err)
  // res.json({error: 'please enter a unique value for email', message: err.message})})


const data={
  user:{
    id:user.id
  }
}


const authtoken = jwt.sign(data,JWT_SECRET);

success=true;
res.json({success,authtoken});

}catch(error){ 
  console.error(error.messsage);
  res.status(500).send("Some Error occured") ; 
}

} )



// ROUTE:2  Authenticate  a user using POST "/api/auth/login" .no login required


router.post('/login',[

  body('email','Enter a valid Email').isEmail(),
  
  body('password','Password cant be blank').exists(),  //Adding a Custom Message
 
] , async(req,res)=>{
  let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password}=req.body;
  try{
    let user= await User.findOne({email});
    if (!user){
      success=false;
      return res.status(400).json({error:"please try to login with correct credentials"});
    }
  
  const passwordCompare= await bcrypt.compare(password,user.password);
  if(!passwordCompare){
    success=false;
    return res.status(400).json({success,error:"please try to login with correct credentials p"});
  }
  
  const data={
    user:{
      id:user.id
    }
  }
  
  const authtoken = jwt.sign(data,JWT_SECRET);
  success=true;
  res.json({ success,authtoken});


   } catch(error){
    console.error(error.messsage);
    res.status(500).send("internal Error occured") ; 
    }
  

});


// ROUTE:3  get logged in  user details using POST "/api/auth/getuser" . login required

router.post('/getuser',fetchuser , async(req,res)=>{


try {
  userId=req.user.id;
  const user=await User.findById(userId).select("-password")
  res.send(user)


} catch (error) {
  console.error(error.messsage);
  res.status(500).send("internal Error occured") ; 
}







})
module.exports=router