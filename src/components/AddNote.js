import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext"

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
        props.showAlert("Added Successfully","success");
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h2 style={{ color: "#333" ,fontFamily: "Arial, sans-serif"}}> Your Task </h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
 
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required  /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>

                    <input type="text" className="form-control" id="description" name="description" value={note.description}  onChange={onChange}minLength={5} required  />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Status</label>

                    <input type="text" className="form-control" id="tag" name="tag"value={note.tag} onChange={onChange} minLength={5} required />
                </div>

                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Task</button>
            </form>
        
        
        <style jsx>{`
            .container {
                background-color: #f8f8f8;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                font-family: Arial, sans-serif;
            }

            .form-label {
                color: #555;
                font-weight: bold;
            }

            .form-control {
                border: 1px solid #ccc;
                border-radius: 3px;
                padding: 8px;
                width: 100%;
                font-size: 14px;
            }

            .btn-primary {
                background-color: #007bff;
                color: #fff;
                border: none;
                padding: 10px 20px;
                border-radius: 3px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                text-transform: uppercase;
            }

            .btn-primary:disabled {
                background-color: #ccc;
                cursor: not-allowed;
            }
        `}</style>
 


</div>




    )
}

export default AddNote