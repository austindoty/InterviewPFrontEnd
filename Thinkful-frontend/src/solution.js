import React, { useState, useEffect } from "react";

function App() {
  // Define state variables to store users and their posts
  const [users, setUsers] = useState([]); // Store the list of users
  const [postsMap, setPostsMap] = useState({}); // Map user IDs to their posts

  // useEffect hook to fetch user data when the component mounts
  useEffect(() => {
    // Fetch users data from the API endpoint
    fetch("https://dummyjson.com/users?limit=10&select=firstName,lastName")
      .then(response => response.json()) // Parse the JSON response
      .then(data => {
        // Update the users state with the fetched user data
        setUsers(data.users);

        // Initialize postsMap with empty arrays for each user ID
        const initialPostsMap = {};
        data.users.forEach(user => {
          initialPostsMap[user.id] = [];
        });
        setPostsMap(initialPostsMap);
      })
      .catch(error => console.error("Error fetching users:", error));
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // Function to handle user click events
  const handleUserClick = (userId) => {
    // Check if posts are already fetched for the clicked user
    if (postsMap[userId].length > 0) {
      // If posts are already fetched, remove them by setting an empty array
      setPostsMap(prevPostsMap => ({
        ...prevPostsMap,
        [userId]: []
      }));
    } else {
      // If posts are not fetched, fetch posts for the clicked user
      fetch(`https://dummyjson.com/posts/user/${userId}`)
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
          // Update postsMap with the fetched posts for the clicked user
          setPostsMap(prevPostsMap => ({
            ...prevPostsMap,
            [userId]: data.posts
          }));
        })
        .catch(error => console.error("Error fetching posts:", error));
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {/* Loop over the list of users and display their names */}
        {users.map((user) => (
          <li key={user.id} onClick={() => handleUserClick(user.id)}>
            {user.firstName} {user.lastName}
            {/* Conditionally render posts for the clicked user */}
            {postsMap[user.id].length > 0 && (
              <ul>
                {/* Loop over the posts of the clicked user and display them */}
                {postsMap[user.id].map((post) => (
                  <li key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;



/// Using Reduc

import React, { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [postsMap, setPostsMap] = useState({});

  useEffect(() => {
    // Fetch users data when component mounts
    fetch("https://dummyjson.com/users?limit=10&select=firstName,lastName")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
        // Initialize an empty posts map for each user
        const initialPostsMap = data.users.reduce((acc, user) => {
          acc[user.id] = [];
          return acc;
        }, {});
        setPostsMap(initialPostsMap);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleUserClick = (userId) => {
    // Check if posts are already fetched for the clicked user
    if (postsMap[userId].length > 0) {
      // If posts are already fetched, remove them
      setPostsMap((prevPostsMap) => ({
        ...prevPostsMap,
        [userId]: [],
      }));
    } else {
      // If posts are not fetched, fetch posts for the clicked user
      fetch(`https://dummyjson.com/posts/user/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setPostsMap((prevPostsMap) => ({
            ...prevPostsMap,
            [userId]: data.posts,
          }));
        })
        .catch((error) => console.error("Error fetching posts:", error));
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => handleUserClick(user.id)}>
            {user.firstName} {user.lastName}
            {/* Render posts underneath each user's name */}
            {postsMap[user.id].length > 0 && (
              <ul>
                {postsMap[user.id].map((post) => (
                  <li key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
