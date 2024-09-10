import React, { useState, useRef, useEffect } from "react";
import axios from "./api";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const containerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/signup", { username, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error occurred");
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    const handleMouseMove = (event) => {
      const containerRect = container.getBoundingClientRect();
      const containerCenterX = containerRect.left + containerRect.width / 2;
      const containerCenterY = containerRect.top + containerRect.height / 2;

      const offsetX = event.clientX - containerCenterX;
      const offsetY = event.clientY - containerCenterY;

      const maxRotation = 20; // Increased max tilt angle for more dynamic effect
      const rotateY = (offsetX / containerRect.width) * maxRotation;
      const rotateX = -(offsetY / containerRect.height) * maxRotation;

      container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      container.style.transition = "transform 0.6s ease-out";
      container.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="container" ref={containerRef}>
      <h1><span className="brand-logo">hard</span>Coded</h1>
      <p>Easing your job search journey.</p>
      <form onSubmit={handleSubmit}>
        
        <input
          type="text"
          placeholder="Username"
          value={username}
          className="input-fields"
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="input-fields"
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button type="submit" className="Signup-button">
          Signup
        </button>
        
        <p className="form-copyright">Copyright © 2024 hardCoded v1.1.0</p>
      </form>
      <br></br>
      <br></br>
      <p>{message}</p>
    </div>
  );
}

export default Signup;
