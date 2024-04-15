import React, { useState } from "react";
import "../Css/Userpage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserPage = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  // Function to fetch users from jsonplaceholder.typicode.com
  const fetchUsers = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const data = response.data;
    setUsers(
      data.map((user) => {
        return {
          ...user,
          isAdded: false,
        };
      })
    );
    console.log(users);
  };

  // Function to add a user to the list
  const addUser = async (user) => {
    let data = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
      address: {
        city: user.address.city,
      },
      company: {
        name: user.company.name,
      },
      isAdded: true,
    };

    const res = await axios.post(
      "https://cointab-assignment-fyak.onrender.com/user/Add",
      data
    );

    alert(res.data);

    setUsers(
      users.map((user) => {
        if (user.id === data.id) {
          return { ...user, isAdded: true };
        }
        return user;
      })
    );
  };

  return (
    <div>
      <h1>Cointab SE-ASSIGNMENT</h1>
      {users.length === 0 && (
        <button id="fetchUsersButton" onClick={() => fetchUsers()}>
          All Users
        </button>
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>City</th>
            <th>Company</th>
            <th>Add / open</th>
          </tr>
        </thead>
        <tbody id="displayData">
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.website}</td>
              <td>{user.address.city}</td>
              <td>{user.company.name}</td>
              <td>
                {user.isAdded ? (
                  <button
                    onClick={() => {
                      localStorage.setItem("user", JSON.stringify(user));
                      navigate(`/post`);
                    }}
                  >
                    Open
                  </button>
                ) : (
                  <button onClick={() => addUser(user)}>Add</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
