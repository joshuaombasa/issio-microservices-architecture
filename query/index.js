const express = require('express')
const axios = require('axios')
const cors = require('cors')
const { randomBytes } = require('crypto')
const PORT = 4034

const posts = {}

const app = express()
app.use(cors())
app.use(express.json())

function handleEvents(type, data) {
  if (type === 'postCreated') {
    const { id, post } = data
    posts[id] = { postId: id, post, comments: [] }
  }

  if (type === 'commentCreated') {
    const { postId, id, comment, status } = data
    const comments = posts[postId].comments
    comments.push({ id, comment, status })
  }

  if (type === 'commentUpdated') {
    const { postId, id, comment, status } = data
    const commentToUpdate = posts[postId].comments.find(comment => comment.id === id)
    commentToUpdate.status = status
    commentToUpdate.comment = comment
  }

}

app.get('/posts', (request, response) => {
  response.json(posts)
})


app.post('/events', (request, response) => {
  const event = request.body
  console.log(event)
  const { type, data } = event

  handleEvents(type, data)
  response.json({})
})



app.listen(PORT, async () => {
  const res = await axios.get('http://localhost:4035/events')
  const events = res.data
  
  for (let event of events) {
    const { type, data } = event
    console.log('Procesing:', type)
    handleEvents(type, data)
  }
  console.log(`server listening on port ${PORT}`)
})