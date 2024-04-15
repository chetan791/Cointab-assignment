import React, { useEffect, useState } from "react";
import "../Css/Postpage.css";
import axios from "axios";

export const PostPage = () => {
  const [posts, setPosts] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  //   console.log(user.id);

  // Function to fetch posts from jsonplaceholder.typicode.com
  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
      );
      const data = response.data;
      // console.log(data);
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  // inbuilt function to call fetchPosts on Mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const addBulkPosts = async () => {
    try {
      const response = await axios.post(
        "https://cointab-assignment-fyak.onrender.com/post/Add",
        posts
      );
      // alert(response.data);
      console.log(response.data);
      setBulkadded(true);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to download an Excel sheet with all posts of the user
  const downloadExcel = async () => {
    try {
      const res = await axios.get(
        `https://cointab-assignment-fyak.onrender.com/post/download/${user.id}`,
        {
          responseType: "blob",
        }
      );

      const blob = res.data;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "posts.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  const [bulkadded, setBulkadded] = useState(false);
  return (
    <div>
      <h1>Post Page</h1>
      {bulkadded ? (
        <button onClick={downloadExcel}>Download In Excel</button>
      ) : (
        <button onClick={addBulkPosts}>Bulk Add</button>
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Body</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{user.name}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
              <td>{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
