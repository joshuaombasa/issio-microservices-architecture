import axios from 'axios';
import { useState } from 'react';

export default function CreateComment({postId}) {
  const [comment, setComment] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    await axios.post(`http://localhost:4031/posts/${postId}/comments`, {comment})
    console.log(comment);
    setComment('')
  }
  
  return (
    <div className="create-comment">
      <form onSubmit={handleSubmit}>
        <label htmlFor="post">
          comment:
        </label>
        <input
          type="text"
          name="post"
          id="post"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
