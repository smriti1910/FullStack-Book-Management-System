require('dotenv').config();
const express = require('express');
const app = express()
const PORT  = process.env.PORT;
app.use(express.json())

// Use CORS middleware
const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose')

app.get('/', (request, response) => {
    response.status(200).json({message:'Hello World!'});
})

const bookRoute = require('./routes/bookRoute')
app.use('/api', bookRoute)

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.once('open', () => console.log(`Connected to database successfully`))
db.on('error', (errorMessage) => console.log(errorMessage))


app.listen(PORT, () => {
    console.log(`Server started running at http://localhost:${PORT}/`);
})