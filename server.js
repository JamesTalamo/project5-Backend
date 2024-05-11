require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

///
const express = require('express')
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api', require('./Routes/ApiRoutes'))



app.use('/', (req,res) => {
    res.sendFile(path.join(__dirname,'test.html'))
})

const PORT = process.env.PORT || 7000
app.listen(PORT, ()=> console.log(`Now listening to PORT ${PORT}`))