import { useState, useEffect } from "react";
import AddSight from "./AddSight";

function SightingList() {
    const [sighting, setSighting] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5005/sightings")
        .then((response) => response.json())
        .then(sightings =>{
            for (let index in sightings){
               if( index !== "3"){
                   setSighting(sightings);
               }
            };       
        })
        
    }, []);

    // to show list of sightings 
    const addSighting = (newSighting) => {
        //console.log(newSighting);
        setSighting((sightings) => [...sightings, newSighting]);

    }

    return (
      <div className="sightings">
        <h2> List of Sightings </h2>
        <ul>
            {sighting.map((sighting, index) =>
                <li key={index}> Individuals ID : {sighting.individuals_id} <br/>
                {sighting.location} {sighting.is_healthy} {sighting.email}
                </li>)}
        </ul>
        <AddSight addSighting={addSighting} />
      </div>
    );
  }
  
  export default SightingList;