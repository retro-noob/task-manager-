var jwt=require('jsonwebtoken');
const JWT_SECRET="AnmolisKing";  // JWT authentication json web token

const fetchuser =(req,res,next)=>{
//Get the user from jwt token and add id to req object 
const token=req.header('auth-token');
if (!token){
    res.status(401).send({error:"please authenticate using a valid token"})
}

try {
    const data= jwt.verify(token,JWT_SECRET);
req.user=data.user;
 next();  // The next() function is not a part of the Node.js or Express API but is the third argument that is passed to the middleware function. This means that the async (req, res) will be called after getting the user in the ‘getuser’ route.
} catch (error) {
    res.status(401).send({error:"please authenticate using a valid token"}) //res.send(): It is used to Send a string response in a different format like XML, plaintext, etc. For example, we can send Hello, plain text, using res.send to /api/auth endpoint.
}
}

module.exports=fetchuser;