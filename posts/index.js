const express = require('express')
const axios = require('axios')
const cors = require('cors')
const { randomBytes } = require('crypto')
const PORT = 4030

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


  try {
    await axios.post('http://event-bus-srv:4035/events', {
      type: 'postCreated',
      data: { id, post }
    })
  } catch (error) {
    console.error(error)
  }

  response.json(posts[id])
})

app.post('/events', (request, response) => {
  const event = request.body
  console.log(event)
  response.json({})
})

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
  
})