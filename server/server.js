const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js')
const cors = require('cors')

app.use(express.json());
app.use(cors());

MongoClient.connect('mongodb://localhost:27017', 
{useUnifiedTopology: true})
.then((client) => {
    const db = client.db('birds_hub')
    const birdsCollection = db.collection('sightings')
    const birdsRouter = createRouter(birdsCollection)
    app.use('/api/sightings', birdsRouter)
})
.catch(console.error)

app.listen(5000, function () {
    console.log(`Listening on port ${ this.address().port }`)
})