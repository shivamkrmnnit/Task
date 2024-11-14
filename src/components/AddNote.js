import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import SearchBar from './search';

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
    date: "",
    priority: "Medium", // Default priority
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag, note.date, note.priority);
    setNote({ title: "", description: "", tag: "", date: "", priority: "Medium" }); // Clear the input fields
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h1>Add a Task</h1>
      <form>
        {/* Title, Description, Tag fields */}
        <div className="form-group my-3">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} placeholder="Title" />
        </div>
        <div className="form-group my-3">
          <label htmlFor="description">Description</label>
          <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} placeholder="Description" />
        </div>
        <div className="form-group my-3">
          <label htmlFor="tag">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} placeholder="Tag" />
        </div>
        {/* Due Date */}
        <div className="form-group my-3">
          <label htmlFor="date">Due Date</label>
          <input type="date" className="form-control" id="date" name="date" value={note.date} onChange={onChange} />
        </div>
        {/* Priority */}
        <div className="form-group my-3">
          <label htmlFor="priority">Priority</label>
          <select className="form-control" id="priority" name="priority" value={note.priority} onChange={onChange}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
    </div>
  );
};

export default AddNote;
