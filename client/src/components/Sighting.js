import { useState, useEffect } from "react";
import SightingForm from "./SightingForm";

function Sighting() {
    const [sightings, setSightings] = useState([{
        datetime: "", 
        individualid: "",
        location: "",
        healthy: "",
        email: "",
    }]);

    // let testvar = 0;
    useEffect(() => {
        fetch("http://localhost:5005/sightings")
        .then((response) => response.json())
        .then(sightings =>{
            // for (let index in sightings){
            //    if( index !== "3"){
                setSightings(sightings);
                // console.log("THIS IS SIGHTINGS!" + JSON.stringify(sightings))
            //    }
            // };       
        })
    }, []);

    // to show list of sightings after adding
    const addSighting = (newSighting) => {
        setSightings((sightings) => [...sightings, newSighting]);
        // return testvar + 1;
    }

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
            return "Looks healthy";
        } else {
        return "Looks Unhealthy";
        }
    }

    return (
      <div className="sightings">
        <div className="form-column">
            <SightingForm addSighting={addSighting}/>
        </div>
        <div className="list-column">
            <h2> List of Sightings </h2>
            <ul className="list-container">
                {sightings.map((sighting, index) =>
                    <li key={index}> <a href="mailto: {sighting.email}"><strong>Contact</strong> </a> for more sighting info
                    <ul className="circle">
                        <li><strong>Individual</strong>: {sighting.nickname}</li>
                        <li><strong>Date{'&'}Time</strong>: {formatDateTime(sighting.datetime)}</li>
                        <li><strong>Location</strong>: {sighting.location}{' '}</li>
                        <li><strong>Health Status</strong>: {boolToString(sighting.healthy)}</li>
                    </ul>
                    </li>)}
            </ul>
        </div>
        
      </div>
    );
  }
  
  export default Sighting;