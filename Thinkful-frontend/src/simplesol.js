import React, { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=10&select=firstName,lastName")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleUserClick = (userId) => {
    if (selectedUserId === userId) return;

    setSelectedUserId(userId);

    fetch(`https://dummyjson.com/posts/user/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.posts);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  };

  return (
    <div>
      <h1>Users</h1>
      <div>
        {users.map((user) => (
          <div key={user.id} onClick={() => handleUserClick(user.id)}>
            <h3>
              {user.firstName} {user.lastName}
            </h3>
          </div>
        ))}
      </div>
      {selectedUserId && (
        <div>
          <h2>Posts</h2>
          {posts.map((post) => (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
