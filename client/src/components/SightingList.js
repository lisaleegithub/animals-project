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

    // // to show list of sightings 
    // const addSighting = (newSighting) => {
    //     //console.log(newSighting);
    //     setSighting((sightings) => [...sightings, newSighting]);
    // }

    // to formate date and time
    function formatDateTime(input) {
        let formattedDate = new Date(input).toLocaleDateString('en-US');
        let formattedTime = new Date(input).toLocaleTimeString('en',
        { timeStyle: 'long', hour12: false, timeZone: 'UTC' });
        return formattedDate + " " + formattedTime;
    }

    // to show health status (true = healthy, false = not healthy)
    function boolToString(input) {
        if (input === true) {
            return "healthy";
        } return "not healthy";
    }

    return (
      <div className="sightings">
        <div className="form-column">
            <AddSight />
        </div>
        <div className="list-column">
            <h2> List of Sightings </h2>
            <ul>
                {sighting.map((sighting, index) =>
                    <li key={index}> Date{'&'}Time: {formatDateTime(sighting.datetime)} <br/> 
                    Saw{' '}{sighting.nickname}{' '}at{' '}{sighting.location}{' '}looking{' '}{boolToString(sighting.healthy)}
                    </li>)}
            </ul>
        </div>
        
      </div>
    );
  }
  
  export default SightingList;