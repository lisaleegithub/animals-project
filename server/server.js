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

// // GET request for sightings table
// app.get('/sightings', cors(), async (req, res) => {
//     // res.json(animals);
//     try{
//         const { rows: sightings } = await db.query('SELECT * FROM sightings');
//         res.send(sightings);
//     } catch (e){
//         return res.status(400).json({e});
//     }
// });

// GET request for JOINed tables (individuals and sightings)
app.get('/sightings', cors(), async (req, res) => {
    try{
        // const { rows: sightings } = await db.query('SELECT individuals.nickname, sightings.datetime, sightings.location, sightings.healthy FROM individuals INNER JOIN sightings ON individuals.id = sightings.individualid');
        const { rows: sightings } = await db.query ('SELECT nickname, sightings.datetime, sightings.location, sightings.healthy, sightings.email, species.common_name, species.scientific_name, species.status_code FROM sightings INNER JOIN individuals ON individuals.id = sightings.individualid INNER JOIN species ON species.id = individuals.specieid');
        res.send(sightings);
    } catch (e){
        return res.status(400).json({e});
    }
});


// POST request for sightings list
app.post('/sightings', cors(), async (req, res) => {
    const newSighting = { 
        datetime: req.body.datetime, 
        location: req.body.location, 
        healthy: req.body.healthy, 
        email: req.body.email, 
        individualid: req.body.individualid
    }
    // console.log(newSighting);
    // const datetimeseen = new Date().toISOString();
    const creationTime = new Date().toISOString();
    const result = await db.query(
        // INSERT INTO needs to match db
        'INSERT INTO sightings (datetime, location, healthy, email, individualid, record_creation_timestamp) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
        // [datetimeseen, "Florida", true, "sighting@sighting.com", 3, creationTime]
        [newSighting.datetime, newSighting.location, newSighting.healthy, newSighting.email, newSighting.individualid, creationTime]
    );
    console.log(result);
    res.json(result);
});

// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});