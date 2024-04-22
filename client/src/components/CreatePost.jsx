import { useState } from 'react';
import axios from 'axios';

export default function CreatePost() {
  const [post, setPost] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    await axios.post(`http://localhost:4030/posts`, {post})
    console.log(post);
    setPost('')
  }
  return (
    <div className="create-post">
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment">
          Tell about yourself so that your suitors know you better:
        </label>
        <input
          type="text"
          name="comment"
          id="comment"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
