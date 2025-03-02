const express = require('express')
const app = express()
const cors = require("cors")
const path = require('path')

const port = process.env.PORT || 3000

const allowedOrigins = [
    'https://polite-smoke-0d1bfe610.6.azurestaticapps.net', 
    'http://localhost:5500' // For local testing
];

/*app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}))*/

// Serve the test page at the root URL
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html'))
})

// Wake up endpoint
app.get('/api/wake-up', (request, response) => {
    console.log('Server wake-up call received')
    response.json({ status: 'Server is awake', timestamp: new Date().toISOString() })
})

// Endpoint for rolling a dice
app.get('/api/roll-dice', (request, response) => {
    console.log('Calling "/api/roll-dice" on the Node.js server.')
    const result = Math.floor(Math.random() * 6) + 1
    response.json({ 
        value: result,
        timestamp: new Date().toISOString(),
        server: 'Azure Node.js Server'
    })
})

// Custom 404 page.
app.use((request, response) => {
    response.type('text/plain')
    response.status(404)
    response.send('404 - Not Found')
})


app.use((err, request, response, next) => {
    console.error(err.message)
    response.type('text/plain')
    response.status(500)
    response.send('500 - Server Error')
})

app.listen(port, () => console.log(
    `Express started at \"http://localhost:${port}\"\n` +
    `press Ctrl-C to terminate.`))
