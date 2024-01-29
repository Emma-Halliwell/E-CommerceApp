const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000

const price = require('./products/price');
const quantity = require('./products/quantity');
const play = require('./products/play');
const fitness = require('./products/fitness');
const storage = require('./products/storage');
const football = require('./products/football');

const passport = require("passport");
const session = require("express-session");
const store = new session.MemoryStore();
const LocalStrategy = require("passport-local").Strategy;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (request, response) => {
    response.send('Hello World')
});

// Requests for Price table
app.get('/price', price.getPrice);
app.get('/price/:id', price.getPriceById);
app.post('/price', price.createPrice);
app.put('/price/:id', price.updatePrice);
app.delete('/price/:id', price.deletePrice);

// Requests for Quantity table
app.get('/quantity', quantity.getQuantity);
app.get('/quantity/:id', quantity.getQuantityById);
app.post('/quantity', quantity.createQuantity);
app.put('/quantity/:id', quantity.updateQuantity);
app.delete('/quantity/:id', quantity.deleteQuantity);

// Requests for Play table
app.get('/play', play.getPlay);
app.get('/play/:id', play.getPlayById);
app.post('/play', play.createPlay);
app.put('/play/:id', play.updatePlay);
app.delete('/play/:id', play.deletePlay);

// Requests for Fitness table
app.get('/fitness', fitness.getFitness);
app.get('/fitness/:id', fitness.getFitnessById);
app.post('/fitness', fitness.createFitness);
app.put('/fitness/:id', fitness.updateFitness);
app.delete('/fitness/:id', fitness.deleteFitness);

// Requests for Storage table
app.get('/storage', storage.getStorage);
app.get('/storage/:id', storage.getStorageById);
app.post('/storage', storage.createStorage);
app.put('/storage/:id', storage.updateStorage);
app.delete('/storage/:id', storage.deleteStorage);

// Requests for Football table
app.get('/football', football.getFootball);
app.get('/football/:id', football.getFootballById);
app.post('/football', football.createFootball);
app.put('/football/:id', football.updateFootball);
app.delete('/football/:id', football.deleteFootball);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});