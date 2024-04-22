const express = require('express')
const axios = require('axios')
const cors = require('cors')
const { randomBytes } = require('crypto')
const PORT = 4031

const comments = {}

const app = express()
app.use(cors())
app.use(express.json())

app.get('/posts/comments', (request, response) => {
  response.json(comments)
})

app.post('/posts/:id/comments', async (request, response) => {
  const { comment } = request.body
  const postId = request.params.id
  const id = randomBytes(4).toString('hex')
  comments[id] = { postId, id, comment, status: 'pending' }

  try {
    await axios.post('http://localhost:4035/events', {
      type: 'commentCreated',
      data: { postId, id, comment, status: 'pending' }
    })
  } catch (error) {
    console.error(error)
  }


  response.json(comments[postId])
})


app.post('/events', async (request, response) => {
  const event = request.body
  console.log(event)
  const { type, data } = event
  try {
    if (type === 'commentModerated') {
      const { postId, id, comment, status } = data
      comments[id].status = status

      await axios.post('http://localhost:4035/events', {
        type: 'commentUpdated',
        data: { postId, id, comment, status }
      })
    }
  } catch (error) {
    console.error(error)
  }

  response.json({})
})

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})