import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllFlights.css";

let User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let res = await axios.get(
          "http://127.0.0.1:8000/api/users/",
        );

        setUsers(res.data);
      } catch (err) {
        console.log("error", err.response?.data);
      }
    };

    fetchUsers();
  }, []);
    console.log("All Users:", users);

  return (
    <div className="allflights-page">
      <div className="flights-header">
        <h1>✈ All Users</h1>
        <p>Manage and view all available users</p>
      </div>

      <div className="flights-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Last Login</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.contact}</td>
                  <td>{user.last_login_ist}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  No Users Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;