This is the step by step guide of how i created this application this may be too long as i add some explanantions in depth but you can easily read the first line and that is kind of heading for my procedures.

For set up and run the application
This is a MERN stack app with dependencies and versions mention below 
  "concurrently": "^7.6.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.6.1",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "express-validator": "^6.14.2",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.8.0"
    I use MongoDB compass, concurrently package so that command "npm run both" will work for both my frontend and backend server.




#Creating backend

By putting all the files related to the backend, in a separate backend folder,Installing Express and Mongoose.

Express: Express.js is a back-end web application framework for "Node.js".

Mongoose: Mongoose is an extraction layer on top of MongoDB, which would help us to connect with the Node Js.

we have firstly created a db.js file in the root folder of the application. 

We would like to use the db.js file in routes/index.js, 
Express Server Setup

Moreover, we would like to make the index.js an express server of the application.

We can create all our routes in "Index.js", 

We would be creating all the models and route files inside the specific folders to have a better management of our application.

Creating Mongoose Models
We are creating a Models folder to store the Mongoose Models. A Mongoose model is a wrapper on the Mongoose schema. A Mongoose schema defines the structure of the document, default values, validators, etc., whereas a Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.

In User.js:
The "user.js" model will contain info about the user.

In Notes.js:
Notes.js model will be containing all the tasks of the application.

Creating Routes
We are creating a Routes folder to store all the routes of the  application.

In auth.js:
We would be using the router inside the "auth.js" file.

Middleware
They are the functions that have access to the request and response object in the request-response cycle. They are used to alter res and req objects for some specific tasks. We have to use the middleware before using the req.body command.
app.use(express.json())

Saving the Data in Database
Firstly, Import the user from the model folder in your auth.js. After that, create a user and use the save function as shown below. The save() function is used to save the document data into the database

we have to import express validator in our auth.js file by writing the below piece of code:
const { body, validationResult } = require('express-validator');

Adding Validation Checks
Now, we would add validation checks for Email, Name, Password.

Error page
Now, If an error occurs in the value then we would like to inform the user about his/her mistake by showing an error page.

Two Entries with One email - issue Fixation
There’s one more issue with our validation, that is if the user submits the request two times with the same ‘Name’ and ‘Email’ then the two different entries of Data are stored in the database. This means that we are not getting the unique email for each submitted data.
Solution: To resolve this issue, we would firstly open the db.js and would specify a database. In our user.js we would create a user variable and user indexes const User = mongoose.model('user', UserSchema);
User.createIndexes();
module.exports = User

Installing bcryptjs package
Bcryptjs is a nodejs package that will help us in implementing password Hashing, salt and pepper in Nodejs easily.

Generating Salt
To generate the salt you can simply use the below command:
const salt = await bcrypt.genSalt(10);

Hash a Password
First of all import bcryptjs in authjs by entering the below command:
const bcrypt = require('bcryptjs');

JWT (JSON web token)
JWT is a JSON web token npm package, which helps in verifying a user.  JWT helps in facilitating secure communication between the server and the client. JSON web token consists of three parts- Header, Payload, and Signature.

Header: The information contained in the header describes the algorithm and the token type used to generate the signature.

Payload: It contains the data you want to send, this data is used to provide authentication to the party receiving the token.

Signature: Whenever we dispatch a JSON web token from the server, we will sign the token with secrets. Here’s how we can create a JWT secret:

Using JSON Web Token(JWT)
First of all, we will import the JSON web token by entering the below command in the Auth.js file: 
var jwt = require('jsonwebtoken');

Creating Login Endpoint & sending auth token
we have created a signup user endpoint in "auth.js". In a similar fashion, we are going to create a login endpoint to authenticate the user

Creating a new Route - Fetch All Notes
Now, we will be creating a new 'fetchallNotes' route, which will provide the client with all the notes of him/her, by fetching them from the database.

Associating the Notes with User
We would like to show the notes, stored in the database of the iNotebook application, of the client to him/her only to maintain and protect the privacy of the user. To add this functionality in the application, we have to somehow associate the Notes with the user.

Creating a New Route - Add Note
Earlier, we have got an empty array as a response on the 'fetchallNotes' endpoint. This had happened as no notes were available for display. Therefore, we will create a new route to add new notes. It will be a post-request route, and it will help us to add a new note to our application. 

 Saving the Notes
Explanation: To save the new notes in the database follow the below-mentioned steps: 
Step 1: Firstly, we would get the title, description and tag from the req.body with the help of the destructing method of javascript.
Step 2: After that, we have added the title, description, status and the specific user in the New Note object. 
Step 3: Finally, we have used the save() function to save the notes in the database and have returned the notes as a response to the client. If you remember, we have already learnt how to save a note in the database. 

Creating Route - Updating Note
We will be creating a new endpoint that will help us to update an existing note in the database. Remember, that we will make sure that the user is logged in for accessing the update Note endpoint.

Validating the User
Now, we will be adding a validation check so that a logged-in user can only update his/her notes and don’t tamper with the notes of another user.

Find and Update 
However, If both the above-mentioned conditions are satisfied, that is the note exists in the database and the user id correctly matches with the logged-in user id. In that circumstances, we will find and update the note by using the findByIdAndUpdate() method.

Creating Route - Delete Note
We will create the delete Note endpoint in a similar way, as we have created the update Note endpoint. Remember, here we will be using the ‘delete’ request method in place of ‘put’ request.



#Creating Frontend

 React router: It provides a way to introduce different pages or routes in our React application without reloading the page. To install react-router, use the below command:
npm i react-router-dom

 Concurrently: Concurrently is an npm package that allows us to use more than one server concurrently. To install concurrently, use the below command:
npm i react-router-dom concurrently
"both": "concurrently \"npm run start\"  \"nodemon  backend/index.js\"" Now, you can run both servers, by executing the ‘both’ in the terminal as follow:
npm run both 

Creating components
We are creating a components folder, in which we will create the following components :
Home: we will add some random text, like ‘This is Home’ in Home.js to identify the component while opening the iNotebook application.
About: we will add some random text, like ‘This is About’ in About.js to identify the component while opening the iNotebook application.
Navbar: in Navbar.js, we will copy-paste and edit the code of a Navbar, from Bootstrap to save some time.

Setting up Router

The Context API - Recall
The Context API can be used to share data with multiple components, without having to pass data through props manually. Any state inside a context will become accessible to every component of the React Application. Now, let’s begin working with Context API.

Creating Context - In noteContext.js

Creating State - In NoteState.js

Using the Created Context -In About.js

Updating the State
In NoteState.js, we will be creating an update function, which will help us in updating the state.

Using the Update Function -In about.js
Now, we will be using the use effect hook in about.js to update the context.

Enhancing the Home

Highlight Active Link

Enhancing Navbar

 Fetching Notes from Context
  we have created the ‘fetchallNotes’ endpoint in the iNotebook thunder client collection, while we were preparing the backend of the application. Hence, we can make a request to the fetch All Notes endpoint, in order to get the notes of a specific user as a response

  Creating Context - In NoteState.js
At this moment, we will copy-paste the response notes in the NoteState.js file (Our Context).  

Using Context - In Home.js

Applying the Map method 
Explanation:  Here, we have used the destructuring method of Javascript to obtain ‘notes’ and ‘SetNotes’ from the Context. Finally, we will be using the map method in the ‘Your Notes’ section to return the notes Title as an array.

Creating Notes component

Creating NoteItem Component and Adding Card to NoteItems

Creating Alert Component

Add a Note Function
creating a new function to add a note to the application. Finally, we have to get the Add note function from the NoteState context in Notes.js with the help of the destructuring method of javascript. As a result, we can call the Add note function in Notes.js.

Creating an Add Note Component
Now, we will be creating a new component in the components folder named AddNote.js, After that, we will cut-paste the ‘Add Note’ container of Home.js in AddNote.js. 
Basic Steps: First of all, we will import the note Context in AddNote.js. Consequently, we would use the destructing method to get the ‘AddNote’ function in the ‘AddNote.js’ component from the Context. Make sure to pass the ‘AddNote’ Component in  Note.js by adding <AddNote/>. 

Assigning the deleteNote Function and Creating a deleteNote Function In noteState context, we will be creating the delete note function

Creating an EditNote Function
First of all, we will create an Edit Note function in the NoteState Context of the application. After that, we will be able to use the EditNote function in different components.

Update Note API call
Now, we would like to make an API call to update notes in the backend of the iNotebook application, we are using the fetch API to make a request to the server and make asynchronous HTTP requests in the web browsers.
First Parameter:  As you can see, the first parameter of the fetch function is the Update Note URL. The URL consists of the host, endpoint and our NotesId.
Second Parameter:  After that, the fetch takes a second JSON object with options like method, headers, request body, and so on. In our case, we have declared the method as a ‘Post’ request and have passed the content type and authoken in the header. Remember that the data will be an object consisting of title, description and Tag.
Returning Response: Finally the response object from Fetch will contain the information about the response object itself. This includes headers, status codes, etc. We have used the response.json() method to get the required data from the response object. 

AddNote API call
We will perform a similar procedure in the addNote API call.

CORS Express Package npm install cors After doing this, we will be using the CORS in the Index.js file of the backend

Creating Get All Notes Function

Adding a Modal for Editing Notes

Creating an Update Note function
In notes.js, First of all, we will create an Update Note function, which will take ‘Note’ as a parameter. We would like to invoke this function, whenever the client clicks on the update icon. Thus,  this update Note function is responsible for rendering the modal of Bootstrap. 

Adding Login Component to iNotebook by Adding the Login SignUp Buttons and Creating a Login and SignUp component

Adding Form to Components
Now, we will add login and sign up forms to the newly created components. Moreover, we will add the functionality such that the client won’t be able to access the Homepage

Validating the Login User

Redirecting the User
After getting success, in the above procedure, we will save the auth token and redirect the client to the Homepage otherwise we will show an alert of ‘invalid credentials’  Here, we have saved the token in the LocalStorage and have used the ‘UseHistory’ hook to redirect the client to the homepage. Make sure to import the use history hook from the react-router-dom. 
Result: Hence, after submitting the form with the correct credentials, the user will be redirected to the Home page of the application

Adding a Sign-Up form

Adding the HandleSubmit Function

Adding Alerts to Login, Signup & Notes Component