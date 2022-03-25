import { useState } from "react";
import IndividualsDropdown from "./IndividualsDropdown";

const SightingForm = (props) => {
    const [sighting, setSighting] = useState({
        datetime: "", 
        individualid: "",
        location: "",
        healthy: "",
        email: "",
    });

    //create functions that handle the event of the user typing into the form
    const handleDateTimechange = (event) => {
        const datetime = event.target.value;
        setSighting((sighting) => ({ ...sighting, datetime }));
    }

    const handleIndividualidChange = (event) => {
        const individualid = event.target.value;
        setSighting((sighting) => ({ ...sighting, individualid }));
    }

    const handleLocationChange = (event) => {
        const location = event.target.value;
        setSighting((sighting) => ({ ...sighting, location }));
    }

    const handleHealthyChange = (event) => {
        const healthy = event.target.value;
        setSighting((sighting) => ({ ...sighting, healthy }));
    }

    const handleEmailChange = (event) => {
        const email = event.target.value;
        setSighting((sighting) => ({ ...sighting, email }));
    }

    //A function to handle the post request
    const postSighting = (newSighting) => {
        return fetch('http://localhost:5005/sightings', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(newSighting)
      }).then((response) => {
          return response.json()
      }).then((data) => {
        console.log("From the post ", data);
        props.addSighting(data);
    });
    }

    const handleSubmit = (e) => {
        let emptySighting = {
            datetime: "",
            individualid: "",
            location: "", 
            healthy: "", 
            email: "",
        }
        e.preventDefault();
        setSighting(sighting); // set usestate for the form
        postSighting(sighting); // make the post request to the db
        // props.addSighting(sighting); // sent the new sighting to the parent
        setSighting(emptySighting); // clear the fields
        
    };

    return (
        <form onSubmit={handleSubmit}>
        {/* <form> */}
        <h2>Add Sightings</h2>
            <fieldset>
                <label>Date and Time of the Sighting</label>
                <input
                    type="datetime-local"
                    id="add-date-time"
                    // placeholder="Date"
                    required
                    value={sighting.datetime}
                    onChange={handleDateTimechange}
                />

                <label>Individual Seen</label>
                <IndividualsDropdown handleIndividualidChange={handleIndividualidChange}/>

                <label>Location of Sighting</label>
                <input
                    type="text"
                    id="add-location"
                    placeholder="Enter location"
                    required
                    value={sighting.location}
                    onChange={handleLocationChange}
                />

                <label>Health of the Animal</label>
                <select value={sighting.healthy} onChange={handleHealthyChange}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>

                <label>Email of Sighter</label>
                <input
                    type="email"
                    id="add-email"
                    placeholder="Enter email"
                    required
                    value={sighting.email}
                    onChange={handleEmailChange}
                />

            </fieldset>
            <button type="submit">Add Sighting</button>
        </form>
    );
};

export default SightingForm;