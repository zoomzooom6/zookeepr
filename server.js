const express = require('express');
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//route for front-end to request data from
const { animals } = require('./data/animals.json');

//instantiate server
const app = express();

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

//parse incoming JSON data
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/api', htmlRoutes);

//instructs server to make files within specified folder (public) static resources
app.use(express.static('public'));

//makes server listen for incoming requests, should be listed last
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});