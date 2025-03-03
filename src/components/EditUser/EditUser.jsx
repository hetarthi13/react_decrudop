import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchUserData, updateUser } from "../../redux/reducer/UserSlice";
import "../../components/AddUser/addUser.css";
const EditUser = () => {
  const [firstName, setFirstName] = useState(""); // State for first name
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [isSubmitting, setIsSubmitting] = useState(false); // To manage the submission status
  const [error, setError] = useState(""); // For error messages
  const dispatch = useDispatch();
  
  const { id } = useParams(); // Get the user id from the URL params

  // Fetch the existing user data when the component mounts
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:8000/api/getbyuseId/${id}`);
  //       const userData = await response.json();
        
  //       if (userData) {
  //         setFirstName(userData.name); // Set the first name in the state
  //         setEmail(userData.email); 
  //         setPassword(userData.password); // Set the email in the state
  //       }
  //     } catch (error) {
  //       setError("Failed to fetch user data.");
  //       console.error("Error fetching user data:", error);
  //     }
  //   };
    
  //   fetchUserData(); // Fetch the user data for the given id
  // }, [id]); // Run this effect whenever the id changes

  const { users } = useSelector((state) => state.user);

  // Fetch the existing user data when the component mounts or when the id changes
  useEffect(() => {
    if (id) {
      dispatch(fetchUserData(id)); // Dispatch the fetchUserData action
    }
  }, [id, dispatch]);

  // Set state when user data is fetched
  useEffect(() => {
    if (users) {
      setFirstName(users.name);
      setEmail(users.email);
      setPassword(users.password); // Assuming password is returned from API (you may want to handle this securely)
    }
  }, [users]);

  // Handle the input changes for first name, email, and password
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  

  // Handle form submission to update user data
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   setError(""); // Reset error message

  //   try {
  //     // Send PUT request to update user data
  //     const response = await fetch(`http://localhost:8000/api/editUser/${id}`, {
  //       method: 'PUT', // Change to PUT since you're updating the user
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         name: firstName,
  //         email,
  //         password, // Send the password if it's needed for update
  //       }),
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       console.log("User updated successfully:", data);
  //       // You can redirect or show a success message here
  //     } else {
  //       setError("Failed to update user.");
  //       console.error("Error updating user:", data);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setError("An error occurred while updating the user. Please try again.");
  //   } finally {
  //     setIsSubmitting(false); // Stop the loading state
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(""); // Reset error message

    try {
      // Dispatch the updateUser action to update the user data
      const actionPayload = {
        id,
        firstName,
        email,
        password,
      };
      await dispatch(updateUser(actionPayload)).unwrap(); // .unwrap() is used to get the result directly
      // You can add a success message or navigate after the user is updated
      window.location.href = "/";
    } catch (error) {
      setError(error.message || "Failed to update user.");
    } finally {
      setIsSubmitting(false); // Stop the loading state
    }
  };

  return (
    <div className="userTable">
      {/* <Link to={"/"}>Back</Link> */}
      <div style={{display:"flex",justifyContent:"start"}}>
      <button className="AddUserButon" onClick={() => window.location.href = "/"}>Back to home Page</button>
      </div>
      
      <h1>Update User Data</h1>
      <form onSubmit={handleSubmit} className="userForm">
        <div className="userInputMain">
          <label>First Name:</label>
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
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            required
             className="userInput"
          />
        </div>

        <div className="userInputMain">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            required
             className="userInput"
          />
        </div>

        <button type="submit" disabled={isSubmitting} className="TableButton">
          Update User
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default EditUser;
