const express = require('express');
const ObjectID = require('mongodb').ObjectID

const createRouter = (collection) => {
    
    const router = express.Router();

    //INDEX - GET ALL
    router.get('/', (req, res) => {
        collection.find().toArray()
        .then((docs) => res.json(docs)) 
        .catch((error) => {
            console.error(error)
            res.status(500)
            res.json({status:500, error:error})
        })
    })


    //CREATE
    router.post('/',(req, res) => {
        const newData = req.body
        collection.insertOne(newData)
        .then((result) => res.json(result.ops[0]))
        .catch((error) => {
            console.error(error)
            res.status(500)
            res.json({status:500, error:error})
        })
        
    })

    //DELETE
    router.delete('/:id', (req, res) => {
        const id = req.params.id
        collection.deleteOne({_id: ObjectID(id)})
        .then((result) => res.json(result))
        .catch((error) => {
            console.error(error)
            res.status(500)
            res.json({status:500, error:error})
        })
    })

    return router
}

module.exports = createRouter;