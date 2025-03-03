import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./getUser.css";
import axios from "axios";
import { deleteUsers, fetchUsers } from "../../redux/reducer/UserSlice";
import { useDispatch, useSelector } from 'react-redux';

const GetUser = () => {
  const [data, setData] = useState([]);
  const { users } = useSelector((state) => state.user);
console.log(users,"users==");

  const dispatch = useDispatch();
  useEffect(() => {
    // const TableData = async () => {
    //   try {
    //     const getData = await axios.get("http://localhost:8000/api/get");
    //     console.log(getData, "getData");
        
    //     // Assuming the response data is an array of users
    //     setData(getData.data);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };
    
    // TableData();
    dispatch(fetchUsers());
  }, [dispatch]);

  const deleteUser = async (id) => {
    console.log(id,"delete user id==");
    
    dispatch(deleteUsers(id));
    setTimeout(() => {
      
    dispatch(fetchUsers());
    }, 500);
  };

  return (
    <div className="userTable">
      {/* <Link to={"/add"}>Add User</Link> */}
      <div style={{display:"flex",justifyContent:"flex-end"}}>
      <button className="AddUserButon " onClick={() => window.location.href = "/add"}>Add User</button>
      </div>
      <h2>User Data</h2>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping over the fetched data and rendering rows */}
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id}> {/* Assuming user has a unique 'id' */}
                <td>{index + 1}</td>
                <td>{user.name} </td>
                <td>{user.email} </td>
                <td>
                  <button className="TableButton"  onClick={() => deleteUser(user._id)}>Delete</button>
                  <button className="TableButton "  onClick={() => window.location.href = `/edit/${user._id}`}>Edit</button>
                  {/* <Link to={`/edit/${user._id}`}>Edit</Link> Assuming you want to edit by user ID */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No users available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GetUser;
