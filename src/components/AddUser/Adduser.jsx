import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./addUser.css";
// import "./getUser/getUser"
const AddUser = () => {
  // Fixed the typo "cosnt" to "const" and initialized the state
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // For showing submission status
  const [error, setError] = useState(""); // To handle errors
  
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
const handlePassswordChange = (e) => {
    setpassword(e.target.value)
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(""); // Clear any previous errors
    window.location.href = "/";
// const data = {

// }
    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint URL
      const response = await fetch('http://localhost:8000/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         name: firstName,
          email,
          password
        }),
      });

     

      const data = await response.json();
      console.log("Form submitted successfully", data);
      // You can handle success here (e.g., show a success message or redirect)
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="userTable">
        {/* <Link to={'/'}>back</Link> */}
        <div style={{display:"flex",justifyContent:"start"}}>
        <button className="AddUserButon" onClick={() => window.location.href = "/"}>Back to Home Page</button>
        </div>
        
      <h1>Add User Data</h1>
      <form onSubmit={handleSubmit} className="userForm">
        <div  className="userInputMain">
          <label className="userLAbel">
            First name:
          </label>
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            placeholder="Enter First Name"
            required
            className="userInput"
          />
        </div>

        <div className="userInputMain">
          <label className="userLAbel">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            required
             className="userInput"
          />
        </div>
        <div   className="userInputMain">
          <label className="userLAbel">
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={handlePassswordChange}
            placeholder="Enter your password"
            required
             className="userInput"
          />
        </div>


        <button type="submit" disabled={isSubmitting} className="TableButton">
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AddUser;
