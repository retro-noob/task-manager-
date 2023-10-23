import React from "react";
import { useState } from "react";  
import NoteContext from "./noteContext";


const NoteState=(props)=>{
 const host ="http://localhost:8080"
 const notesInitial=[]
 const [notes ,setNotes ] = useState(notesInitial);

// GET  ALL NOTE :FUNCTION

const getNotes=async()=>{       
 
  // API call (TODO)
const response = await fetch(`${host}/api/notes/fetchallnotes`, {
  method: 'GET', 
  headers: {
    'Content-Type': 'application/json',
    
      "auth-token":localStorage.getItem('token')
    
}
 
  
});
const json = await response.json()
console.log(json) 
setNotes(json)


 }

  
// ADD  A NOTE :FUNCTION

 const addNote = async(title,description,tag)=>{      // IMPORTANT user auth token k throufh baad m lena h 
 
  // API call (TODO)
const response = await fetch(`${host}/api/notes/addnote`, {
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json',
     "auth-token": localStorage.getItem('token')
    
   
  },
 
  body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
});

const note =await response.json();
setNotes(notes.concat(note))

 // notes array m push kra note ko uske baad notestate ko update concat returns a array push update an array

 }




// DELETE  A NOTE :FUNCTION
const deleteNote= async (id)=>{

//API CALL 
const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
  method: 'DELETE', 
  headers: {
    'Content-Type': 'application/json',
    "auth-token": localStorage.getItem('token')
   
  }
});
const json =response.json();
console.log(json)


console.log("Deleting the note with id" + id);
const newNotes = notes.filter((note) => { return note._id !== id })
setNotes(newNotes)
}



// EDIT  A NOTE :FUNCTION
const editNote=async (id,title,description,tag)=>{
//API calls

const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
  method: 'PUT', 
  headers: {
    'Content-Type': 'application/json',
     "auth-token": localStorage.getItem('token')
    
   
  },
 
  body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
});
const json = await response.json();
console.log(json)

let newNotes=JSON.parse(JSON.stringify(notes))
  //Logic for EDIT in client
  for (let index = 0; index < newNotes.length; index++) {
    const element = newNotes[index];
    if(element._id===id){
      newNotes[index].title=title;
      newNotes[index].description=description;
      newNotes[index].tag=tag;
      break;
    }    
  }
  setNotes(newNotes);
}


// ShareNote

// const [key,setKey]=useState()

   
// const shareNote=(note)=>{

//  setKey(note._id);
 
  
// } 

// console.log(key)

// var key2 = key


// const [sjson,setSjson]=useState()

// const feedNote = async () => {
  
//   console.log(`${host}/api/notes/fetchsnote?noteid=${key2}`+'sas')
//     const response = await fetch(`${host}/api/notes/fetchsnote?noteid=${key2}`, {
//       method: 'GET', 
//       headers: {
//         'Content-Type': 'application/json',
          
//           "auth-token":localStorage.getItem('token')
        
//     }
     
      
//     });
//     const json = await response.json()

//  setSjson(json)    

//   }

// function findNoteById(notes, id) {
  
// }



return(
  //NoteContext provider contains all the children components 
    <NoteContext.Provider  value ={{notes,addNote,deleteNote,editNote,getNotes}}>
{props.children}
    </NoteContext.Provider>
)

}

export default NoteState;