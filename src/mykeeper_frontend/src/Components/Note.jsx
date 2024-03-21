import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import {mykeeper_backend} from "../../../declarations/mykeeper_backend";

function Note(props) {

    function deleteNote(id) {
        props.deleteListNote(id)
    }
    
    const newList = props.notes;
    console.log(newList);
    mykeeper_backend.removeNote(newList);
    
    return (
        props.notes.map((note, index) =>
                <div  className="note" key={index} id={index}>
                    <h1>{note.title}</h1>
                    <p>{note.content}</p>
                    <button onClick={() => deleteNote(index)}>
                        <DeleteIcon />
                    </button>
                </div>
        )
    );

}

export default Note;