// import path module
const path = require('path')

// initialize express app
const express = require('express')
const app = express()

// to receive imported functions
const db = require('./queries')

// define port for server
const port = 8000

// Middleware ( telling express we'll be parsing json )
app.use(express.json())
app.use(express.urlencoded({ extended : true }))

// host react app as static files
app.use(express.static(path.resolve(__dirname, '../client/build')))

// define routes
app.get('/', (req, res)=>{
    // define what should happen (send html file)
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

// Create, Read, Update, Delete
app.get('/links', db.getLinks)
app.get('/links/:id', db.getLinkById);
app.post('/newLink', db.createLink)
app.put('/links/:id', db.updateLink)
app.delete('/links/:id', db.deleteLink)

// start app on port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
}) 
