const express = require('express')
const axios = require('axios')
const cors = require('cors')
const { randomBytes } = require('crypto')
const PORT = 4032

const posts = {}

const app = express()
app.use(cors())
app.use(express.json())

app.get('/posts', (request, response) => {
  response.json(posts)
})

app.post('/posts', async (request, response) => {
  const { post } = request.body

  const id = randomBytes(4).toString('hex')
  posts[id] = { id, post }

  await axios.post('http://localhost:4035/events', {
    type: 'postCreated',
    data: { id, post }
  })

  response.json(posts[id])
})

app.post('/events', async (request, response) => {
  const event = request.body
  console.log(event)
  const { type, data } = event
  if (type === 'commentCreated') {
    const { postId, id, comment, status } = data
    const moderatedStatus = comment.includes('sex') ? 'rejected' : 'approved'

    await axios.post('http://localhost:4035/events', {
      type: 'commentModerated',
      data: { postId, id, comment, status: moderatedStatus }
    })
  }
  response.json({})
})

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})