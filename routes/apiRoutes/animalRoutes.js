const router = require('express').Router();
const { 
    filterByQuery, 
    findById, 
    createNewAnimal, 
    validateAnimal 
} = require('../../lib/animals');
const { animals } = require('../../data/animals.json');

//add the route, GET is action of client requesting server to provide data
router.get('/animals', (req, res) => {
    //good for sending short messages
    //res.send('Hello!');

    //resolves names of all entries in json file specified
    //res.json(animals);

    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

//route for req.params, must come after other GET route
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

//route to add data to server, POST is action of client requesting server to accept data
router.post('/animals', (req, res) => {
    //set id based on next index of array
    req.body.id = animals.length.toString();

    //if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal entry is not properly formatted.');
    } else {
        //add animal to json file and animals array in this function
        const animal = createNewAnimal(req.body, animals);

        //req.body is where our incoming content will be
        res.json(animal);
    }
});

module.exports = router;