import React, { useState, useEffect } from "react";

// Main App component
function App() {
  // Define state variables to store users and their posts
  const [users, setUsers] = useState([]); // Store the list of users
  const [postsMap, setPostsMap] = useState({}); // Map user IDs to their posts

  // useEffect hook to fetch user data when the component mounts
  useEffect(() => {
    // Fetch users data from the API endpoint
    fetch("https://dummyjson.com/users?limit=10&select=firstName,lastName")
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        // Update the users state with the fetched user data
        setUsers(data.users);

        // Initialize postsMap with empty arrays for each user ID
        const initialPostsMap = {};
        data.users.forEach((user) => {
          initialPostsMap[user.id] = [];
        });
        setPostsMap(initialPostsMap);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // Function to handle user click events
  const handleUserClick = (userId) => {
    // Check if posts are already fetched for the clicked user
    if (postsMap[userId].length > 0) {
      // If posts are already fetched, remove them by setting an empty array
      setPostsMap((prevPostsMap) => ({ ...prevPostsMap, [userId]: [] }));
    } else {
      // If posts are not fetched, fetch posts for the clicked user
      fetch(`https://dummyjson.com/posts/user/${userId}`)
        .then((response) => response.json()) // Parse the JSON response
        .then((data) => {
          // Update postsMap with the fetched posts for the clicked user
          setPostsMap((prevPostsMap) => ({
            ...prevPostsMap,
            [userId]: data.posts,
          }));
        })
        .catch((error) => console.error("Error fetching posts:", error));
    }
  };

  // Render the component
  return (
    <div>
      {/* Heading */}
      <h1>Users</h1>
      {/* Render a list of users */}
      <div>
        {users.map((user) => (
          <div key={user.id} onClick={() => handleUserClick(user.id)}>
            {/* Display user's name */}
            <h3>
              {user.firstName} {user.lastName}
            </h3>
            {/* Conditionally render posts for the clicked user */}
            {/* Conditionally render posts for the clicked user */}
            {postsMap[user.id].length > 0 && (
              <>
                {postsMap[user.id].map((post) => (
                  <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Export the App component as the default export
export default App;
