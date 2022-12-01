let express = require('express')
let routes = require('./routes/facts.js')
let path = require('path')

let app = express()

//Serve the files in the content directory
let staticContentPath = path.join(__dirname, 'content')
let staticContent = express.static(staticContentPath)
app.use('/', staticContent)

app.use('/api', routes)

app.use('/page', express.static(path.join(__dirname, 'content')))

//error handler to catch request made outside the specified/defined url
app.use(function (req, res, next ){
    res.status(404).send('Not found')
})
// Error handling route for server errors
app.use(function (err, req, res, next) {
    console.error(err)
    res.status(500).send('Server error')
})

// Start server running on port 3000
let server = app.listen(process.env.PORT || 3000, function() {
    console.log('app running on port', server.address().port)
})