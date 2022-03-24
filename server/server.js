const express = require('express');
const cors = require('cors');
require('dotenv').config()
const db = require('../server/db/db-connection.js'); 

const app = express();

const PORT = 5005;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route /
app.get('/', (req, res) => {
    res.json({ message: 'Hello from My ExpressJS' });
});

// GET request for species table but endpoint is /animals
app.get('/animals', cors(), async (req, res) => {
    // res.json(animals);
    try{
        const { rows: species } = await db.query('SELECT * FROM species');
        res.send(species);
    } catch (e){
        return res.status(400).json({e});
    }
});

// GET request for individuals table
app.get('/individuals', cors(), async (req, res) => {
    // res.json(animals);
    try{
        const { rows: individuals } = await db.query('SELECT * FROM individuals');
        res.send(individuals);
    } catch (e){
        return res.status(400).json({e});
    }
});

// GET request for sightings table
app.get('/sightings', cors(), async (req, res) => {
    // res.json(animals);
    try{
        const { rows: sightings } = await db.query('SELECT * FROM sightings');
        res.send(sightings);
    } catch (e){
        return res.status(400).json({e});
    }
});

// POST request for sightings list
// need to find out how to combine date & time
app.post('/sightings', cors(), async (req, res) => {
    const newSighting = { 
        date: req.body.date, 
        time: req.body.time, 
        location: req.body.location, 
        isHealthy: req.body.isHealthy, 
        email: req.body.email, 
        individualsId: req.body.individualsId
    }

    // console.log("this is the post", [newSighting.date, newSighting.time, newSighting.location, newSighting.isHealthy, newSighting.email, newSighting.recordCreationTimestamp ]);
    const datetime = new Date().toISOString();
    const creationTime = new Date().toISOString();
    const result = await db.query(
        // INSERT INTO needs to match db
        // individuals_id should be individual_id ideally
        'INSERT INTO sightings (date_time, location, is_healthy, email, individuals_id, record_creation_timestamp) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
        // [datetime, "California", true, "sighting@sighting.com", 1, creationTime]
        [datetime, newSighting.location, newSighting.isHealthy, newSighting.email, newSighting.individualsId, creationTime]
    );
    console.log(result);
    res.json(result);
});

// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});