import React, { useState, useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote, updateNote: contextUpdateNote } = context;  // Rename updateNote from context to contextUpdateNote

  const { note, updateNote: noteUpdate } = props;  // Rename updateNote from props to noteUpdate

  // Use local state to manage the completion status
  const [isCompleted, setIsCompleted] = useState(note.completed || false);

  // Helper function to check if the task is overdue, upcoming, or completed
  const getTaskStatus = () => {
    const currentDate = new Date();
    const dueDate = new Date(note.date); // Ensure dueDate is in a proper date format

    if (isCompleted) {
      return { status: 'Completed', color: 'green' }; // Green for completed tasks
    } else if (dueDate < currentDate) {
      return { status: 'Overdue', color: 'red' }; // Red for overdue tasks
    } else {
      return { status: 'Upcoming', color: 'blue' }; // Blue for upcoming tasks
    }
  };

  const { status, color } = getTaskStatus(); // Get the task status and color

  // Handle marking the task as completed
  const handleComplete = () => {
    setIsCompleted(true); // Mark the task as completed
  };

  // Change button text and color when task is completed
  const getCompleteButton = () => {
    if (isCompleted) {
      return (
        <button className="btn btn-success mx-2" disabled>
          Completed
        </button>
      );
    } else {
      return (
        <button className="btn btn-success mx-2" onClick={handleComplete}>
          Mark as Completed
        </button>
      );
    }
  };

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text"> {note.description} </p>
          <p className="card-text"> {note.tag} </p>
          <p className="card-text"> {note.date} </p>
          <p className="card-text"> {note.priority} </p>
          
          {/* Status Text */}
          <p className="card-text">
            <strong>Status: </strong>
            <span style={{ color: color }}>{status}</span> {/* Apply color to the status text */}
          </p>

          {/* Mark as Completed Button */}
          {getCompleteButton()}  {/* This will render the button based on completion status */}

          {/* Update and Delete buttons */}
          <i className="mx-2" onClick={() => { noteUpdate(note) }}> {/* Call noteUpdate */}
            <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} viewBox="0 0 512 512">
              <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
            </svg>
          </i>

          <i className="mx-2" onClick={() => { deleteNote(note._id) }}>
            <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} viewBox="0 0 448 512">
              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
            </svg>
          </i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
