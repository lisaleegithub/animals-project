const express = require('express');
const cors = require('cors');
require('dotenv').config()
const db = require('../server/db/db-connection.js'); 

const app = express();

const PORT = 5005;
app.use(cors());
app.use(express.json());

//creates an endpoint for the route /
app.get('/', (req, res) => {
    res.json({ message: 'Hello from My ExpressJS' });
});

//GET request for species table but endpoint is /animals
app.get('/animals', cors(), async (req, res) => {
    // res.json(animals);
    try{
        const { rows: species } = await db.query('SELECT * FROM species');
        res.send(species);
    } catch (e){
        return res.status(400).json({e});
    }
});

//GET request for individuals table
app.get('/individuals', cors(), async (req, res) => {
    // res.json(animals);
    try{
        const { rows: individuals } = await db.query('SELECT * FROM individuals');
        res.send(individuals);
    } catch (e){
        return res.status(400).json({e});
    }
});

//GET request for sightings table
app.get('/sightings', cors(), async (req, res) => {
    // res.json(animals);
    try{
        const { rows: sightings } = await db.query('SELECT * FROM sightings');
        res.send(sightings);
    } catch (e){
        return res.status(400).json({e});
    }
});


// //POST request for individuals table
// app.post('/api/animals', cors(), async (req, res) => {
//     const newSighting = { date: req.body.date, time: req.body.time, individual: req.body.individual, location: req.body.location, isHealthy: req.body.isHealthy, email: req.body.email }
//     console.log("this is the post", [newSighting.date, newSighting.time, newSighting.individual, newSighting.location, newSighting.isHealthy, newSighting.email ]);
//     const result = await db.query(
//         'INSERT INTO individuals (date, time, individual, location, isHealthy, email) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
//         [newSighting.date, newSighting.time, newSighting.individual, newSighting.location, newSighting.isHealthy, newSighting.email]
//     );
//     console.log(result.rows[0]);
//     res.json(result.rows[0]);
// });

// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});