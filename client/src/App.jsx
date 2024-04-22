import { useState } from 'react'

import './App.css'
import CreateComment from './components/CreateCommment'
import CreatePost from './components/CreatePost'
import PostsList from './components/PostsList'


function App() {
 
  return (
    <div className='container'>
     <CreatePost/>
     <PostsList/>
     {/* <CreateComment/> */}
    </div>
  )
}

export default App
