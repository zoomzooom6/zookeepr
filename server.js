const express = require('express');
//instantiate server
const app = express();
//route for front-end to request data from
const { animals } = require ('./data/animals.json');

//makes server listen for incoming requests
app.listen(3001, () => {
    console.log('API server now on port 3001!');
});

//function to filter search results
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        //save personalityTraits as a dedicated array
        //If personalityTraits is a string, place it into a new array and save
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        //loop through each trait in the personalityTraits array
        personalityTraitsArray.forEach(trait => {
            //check trait against each animal in filteredResults array is an initial copy of animalsArray
            //updating it for each trait in the .forEach() loop
            //for each trait being targeted by the filter, filteredResults array will only contain
            //entries containing specified trait
            //at the end, will be array of animals that have every one of the traits after .forEach() loop
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    } 
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }

    return filteredResults;
}

//add the route
app.get('/api/animals', (req, res) => {
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