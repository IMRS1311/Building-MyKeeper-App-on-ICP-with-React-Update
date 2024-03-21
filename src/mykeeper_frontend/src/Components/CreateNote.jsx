import React, {useEffect, useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import Note from "./Note";
import {mykeeper_backend} from "../../../declarations/mykeeper_backend";

function CreateNote() {
    const [newNote, setNote] = useState({title: "", content: ""});
    const [notes, setNotesList] = useState([]);
    const [isExpanded, setExpanded] = useState(false);

    function expand() {
        setExpanded(true);
    }

    function handleChange(event) {
        const {name, value} = event.target 
        setNote(prevList => {
            return {...prevList, [name]: value};
            });
    }

    function submitNotes(event) {
        event.preventDefault();

        if (!newNote.title.trim() || !newNote.content.trim()) {
            return;
        }
        setNotesList(prevList => {
            mykeeper_backend.createNote(newNote.title, newNote.content)
            return [newNote, ...prevList];
            });

        setNote({title: "", content: ""});
    };

    useEffect(() => {
        console.log("useEffect is triggered");
        fetchData();
    }, []);

    async function fetchData() {
        const notesArray = await mykeeper_backend.readNotes();
        setNotesList(notesArray);
    }

    function deleteListNote(id) {
        
        // Alternative Solution:
        // mykeeper_backend.removeNote(id);

        setNotesList(prevList => {
            return prevList.filter(
                (newNote, index) => {
                    return index !== id;
                }
            )
        })
    };

    function expand() {
        setExpanded(true);
    }

    return (
        <div>
            <div className="form">
                <form className="create-note">
                {isExpanded && (
                    <input onChange={handleChange} name="title" type="text" value={newNote.title} placeholder="Title" /> )}
                
                        <textarea 
                        onClick={expand} rows={isExpanded ? "3" : "1"} 
                        onChange={handleChange} name="content" type="text" value={newNote.content} placeholder="Take a note..." />
                <Zoom in={isExpanded}>
                    <Fab onClick={submitNotes}>
                    <AddIcon />
                    </Fab>
                </Zoom>
                </form>
            </div>

            <Note notes={notes} deleteListNote= {deleteListNote}/>
            
        </div>
    );
}

export default CreateNote;