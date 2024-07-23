import React, { useState } from "react";

import NoteContext from "./noteContext";
// eslint-disable-next-line
import { json } from "react-router-dom";


const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const notesInitial=[] 

   

    const [notes, setNotes] = useState(notesInitial)



    // get all Note
    const getNote = async()=>{

      
      const response = await fetch(`${host}/api/notes/fetchallnotes`,{
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          "auth-token":localStorage.getItem('token')
        }

      });
      const json = await response.json()
      console.log(json)

      setNotes(json)
      
  

    }







// Add a Note
    const addNote = async(title , description, tag)=>{

      
      const response = await fetch(`${host}/api/notes/addnotes`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          "auth-token":localStorage.getItem('token')
        },

        body:JSON.stringify({title, description, tag})
      });
      const note = await response.json();
      
    setNotes(notes.concat(note))
    


    }

    //delete a note

    const deleteNote= async (id)=>{

      const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json',
          "auth-token":localStorage.getItem('token')
        }

      });
      const json = response.json();
      console.log(json);

      console.log(id);
      const newNotes = notes.filter((note)=>{return note._id !== id})
      setNotes(newNotes)
    }

    // Edit a Note

    const editNote= async(id,title , description, tag)=>{

      //API call

      const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json',
          "auth-token":localStorage.getItem('token')
        },

        body:JSON.stringify({title, description, tag})
      });
      const json = await response.json();
      console.log(json);

    

      // login to edit in client
      let newNotes1 = JSON.parse(JSON.stringify(notes))
      for (let index = 0; index < notes.length; index++) {
        const element = newNotes1[index];
        if(element._id === id){
          newNotes1[index].title = title;
          newNotes1[index].description = description;
          newNotes1[index].tag = tag;
          break;

        }
        setNotes(newNotes1)
        
      }

    }

    return(
        <NoteContext.Provider value={{notes, addNote,deleteNote,editNote,getNote}} >
            {props.children}
        </NoteContext.Provider>
    )

}


export default NoteState;