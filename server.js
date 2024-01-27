const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./queries');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (request, response) => {
    response.send('Hello World')
});

// app.get('/users', db.getUsers);

// Requests for Price table
app.get('/price', db.getPrice);
app.get('/price/:id', db.getPriceById);
app.post('/price', db.createPrice);
app.put('/price/:id', db.updatePrice);
app.delete('/price/:id', db.deletePrice);

// Requests for Quantity table
app.get('/quantity', db.getQuantity);
app.get('/quantity/:id', db.getQuantityById);
app.post('/quantity', db.createQuantity);
app.put('/quantity/:id', db.updateQuantity);
app.delete('/quantity/:id', db.deleteQuantity);

// Requests for Play table
app.get('/play', db.getPlay);
app.get('/play/:id', db.getPlayById);
app.post('/play', db.createPlay);
app.put('/play/:id', db.updatePlay);
app.delete('/play/:id', db.deletePlay);

// Requests for Fitness table
app.get('/fitness', db.getFitness);
app.get('/fitness/:id', db.getFitnessById);
app.post('/fitness', db.createFitness);
app.put('/fitness/:id', db.updateFitness);
app.delete('/fitness/:id', db.deleteFitness);

// Requests for Storage table
app.get('/storage', db.getStorage);
app.get('/storage/:id', db.getStorageById);
app.post('/storage', db.createStorage);
app.put('/storage/:id', db.updateStorage);
app.delete('/storage/:id', db.deleteStorage);

// Requests for Football table
app.get('/football', db.getFootball);
app.get('/football/:id', db.getFootballById);
app.post('/football', db.createFootball);
app.put('/football/:id', db.updateFootball);
app.delete('/football/:id', db.deleteFootball);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});