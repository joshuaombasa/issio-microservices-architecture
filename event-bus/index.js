const express = require('express')
const axios = require('axios')
const cors = require('cors')
const { randomBytes } = require('crypto')
const PORT = 4035

const events = []

const app = express()
app.use(cors())
app.use(express.json())

app.get('/events', (request, response) => {
    response.json(events)
})

app.post('/events', async (request, response) => {
    const event = request.body
    console.log(event)
    events.push(event)
    try {
        await axios.post('http://query-srv:4034/events', event)
        await axios.post('http://posts-srv:4030/events', event)
        await axios.post('http://comments-srv:4031/events', event)
        await axios.post('http://moderation-srv:4032/events', event)
    } catch (error) {
        console.error(error)
    }


    response.json({})
})

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})