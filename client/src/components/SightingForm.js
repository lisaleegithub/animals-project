import { useState } from "react";

const SightingForm = (props) => {
    const [sighting, setSighting] = useState({
        date: "", //date
        time: "", //time
        individualid: "", //string - dropdown?
        location: "", // string or num format
        healthy: "", //boolean but not
        email: "", //email format
    });

    //create functions that handle the event of the user typing into the form
    const handleDateChange = (event) => {
        const date = event.target.value;
        setSighting((sighting) => ({ ...sighting, date }));
    }

    const handleTimeChange = (event) => {
        const time = event.target.value;
        setSighting((sighting) => ({ ...sighting, time }));
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
        return fetch('http://localhost:5005/animals', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(newSighting)
      }).then((response) => {
          return response.json()
      }).then((data) => {
        console.log("From the post ", data);
        props.AddSight(data);
    });
    }

    const handleSubmit = (e) => {
        let emptySighting = {
            date: "", //date
            time: "", //time
            individualid: "", //string - dropdown?
            location: "", // string or num format
            healthy: "", //boolean but not
            email: "", //email format
        }
        e.preventDefault();
        setSighting(sighting); // set usestate for the form
        postSighting(sighting); // make the post request to the db
        props.AddSight(sighting); // sent the new sighting to the parent
        setSighting(emptySighting); // clear the fields
        
    };

    return (
        <form onSubmit={handleSubmit}>
        {/* <form> */}
        <h2>Add Sightings</h2>
            <fieldset>
                <label>Date of the Sighting</label>
                <input
                    type="date"
                    id="add-date"
                    // placeholder="Date"
                    required
                    value={sighting.date}
                    onChange={handleDateChange}
                />

                <label>Time of the Sighting</label>
                <input
                    type="time"
                    id="add-time"
                    // placeholder="Time"
                    required
                    value={sighting.time}
                    onChange={handleTimeChange}
                />

                <label>Individual Seen</label>
                <select value={sighting.individualid} required onChange={handleIndividualidChange}>
                    <option value="individualid1">1</option>
                    <option value="individualid2">2</option>
                    <option value="individualid3">3</option>
                    <option value="individualid4">4</option>
                    <option value="individualid5">5</option>
                    <option value="individualid6">6</option>
                </select>

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