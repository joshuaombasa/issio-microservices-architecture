import axios from 'axios';
import { useEffect, useState } from 'react';
import CreateComment from './CreateCommment';

export default function PostsList() {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    async function fetchPosts() {
      const res = await axios.get(`http://localhost:4034/posts`);
      setPosts(res.data);
    }

    fetchPosts();
  }, []);

  const RenderComments = ({comments}) => {
    return comments.map(item => <span key={item.id}>{item.comment}</span>)
  }
 
  console.log(Object.values(posts))
  const postElements = Object.values(posts).map((item) => (
    <div className="post-item" key={item.postId}>
      <h2>{item.post}</h2>
      <div className="comment-list">
        <RenderComments comments={item.comments}/>
      </div>
      <CreateComment postId={item.postId} />
    </div>
  ));

  return (
    <div className="">
      <h1>pists lists</h1>
      {postElements}
    </div>
  );
}
