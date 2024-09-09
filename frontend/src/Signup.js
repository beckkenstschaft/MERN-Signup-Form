import React, { useState } from "react";
import axios from "./api";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/signup", { username, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message || "Error occurred");
    }
  };

  return (
    <div className="container">
      <br></br>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          className="input-fields"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br></br>
        <br></br>
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="input-fields"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <br></br>
        <button type="submit" className="Signup-button">Signup</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Signup;
