const express = require('express')
const app = express()
const cors = require("cors")

const port = process.env.PORT || 3000

// Enable CORS and static file serving
app.use(express.static(__dirname + '/static'))
app.use(cors({ origin: '*' }))

// Endpoint for rolling a dice
app.get('/api/roll-dice', (request, response) => {
    console.log('Calling "/api/roll-dice" on the Node.js server.')
    const result = Math.floor(Math.random() * 6) + 1
    response.json({ value: result })
})

// Custom 404 page.
app.use((request, response) => {
    response.type('text/plain')
    response.status(404)
    response.send('404 - Not Found')
})

// Custom 500 page.
app.use((err, request, response, next) => {
    console.error(err.message)
    response.type('text/plain')
    response.status(500)
    response.send('500 - Server Error')
})

app.listen(port, () => console.log(
    `Express started at \"http://localhost:${port}\"\n` +
    `press Ctrl-C to terminate.`)
)
