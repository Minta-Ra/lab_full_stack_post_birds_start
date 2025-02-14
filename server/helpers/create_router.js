const express = require('express');
const ObjectID = require('mongodb').ObjectID

const createRouter = (collection) => {
    
    const router = express.Router();

    //INDEX - GET ALL
    router.get('/', (req, res) => {
        collection.find().toArray()
        .then((docs) => res.json(docs)) 
        .catch((err) => {
            console.error(err)
            res.status(500)
            res.json({status:500, error:err})
        })
    });

    // CREATE NEW
    router.post('/',(req, res) => {
        const newData = req.body
        collection.insertOne(newData)
        .then((result) => res.json(result.ops[0]))
        .catch((err) => {
            console.error(err)
            res.status(500)
            res.json({status:500, error:err})
        })
    });

    // DELETE BY ID
    router.delete('/:id', (req, res) => {
        const id = req.params.id
        collection.deleteOne({_id: ObjectID(id)})
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err)
            res.status(500)
            res.json({status:500, error:err})
        })
    });

    return router;
}

module.exports = createRouter;