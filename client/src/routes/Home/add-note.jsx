import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AddNote = () => {
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/notes`;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  //   HandleSubmit?
  const addNote = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 2000);
      } else {
        console.log("Failed to submit");
      }
    } catch (err) {
      console.log(error);
    }
  };

  return (
    <div>
      <Link to="/" className="back-button">
        👈 back
      </Link>
      <form onSubmit={addNote}>
        <div className="singlenote">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="title"
            />
          </div>
          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows={4}
              cols={50}
              className="description"
            ></textarea>
          </div>

          <input
            type="submit"
            value={submitted ? "Saving note..." : "Save Note"}
            disabled={submitted}
          />

          <p className="text-center">{submitted && <div className="success-message">Note submitted</div>}</p>
        </div>
      </form>
    </div>
  );
};

export default AddNote;
