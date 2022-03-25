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
        // console.log(event);
        const datetime = event.target.value;
        setSighting((sighting) => ({ ...sighting, datetime }));
        console.log("handle datetime")
        console.log(sighting)
    }

    const handleIndividualidChange = (event) => {
        // console.log(event);
        const individualid = event.target.options.selectedIndex + 1;
        setSighting((sighting) => ({ ...sighting, individualid }));
        console.log("handle individualid")
        console.log(sighting)
    }

    const handleLocationChange = (event) => {
        const location = event.target.value;
        setSighting((sighting) => ({ ...sighting, location }));
        console.log("handle location")
        console.log(sighting)
    }

    // const handleHealthyChange = (event) => {
    //     // console.log(event);
    //     const healthy = event.target.options.selectedIndex;
    //     setSighting((sighting) => ({ ...sighting, healthy }));
    //     // console.log("handle healthy")
    //     console.log(sighting)
    // }
    function strToBool(input) {
        if (input === "true") {
          return true;
        }
        return false;
    }

    const handleHealthyChange = (event) => {
        const healthy = strToBool(event.target.value);
        setSighting((sighting) => ({ ...sighting, healthy }));
        console.log(sighting);
      };

    const handleEmailChange = (event) => {
        const email = event.target.value;
        setSighting((sighting) => ({ ...sighting, email }));
        console.log(sighting)
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
        // let emptySighting = {
        //     datetime: "",
        //     individualid: "",
        //     location: "", 
        //     healthy: true, 
        //     email: "",
        // }
        e.preventDefault();
        console.log("current sighting is" + JSON.stringify(sighting));
        setSighting(sighting); // set usestate for the form
        postSighting(sighting); // make the post request to the db
        props.addSighting(sighting); // sent the new sighting to the parent
        // setSighting(emptySighting); // clear the fields
    };

    return (
        <>
        <h2>Add Sightings</h2>

        <form onSubmit={handleSubmit}>
        {/* <form> */}
        
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

                {/* <label>Health of the Animal</label>
                <select value={sighting.healthy} onChange={handleHealthyChange}>
                    <option value="false">False</option>
                    <option value="true">True</option>
                </select> */}

                    <label>Health of the Animal</label>

                    <label for="healthy">
                        <input type="radio" id="health" name="healthy" value="true" onChange={handleHealthyChange} />
                        Healthy
                    </label>
                    <label for="unhealthy">
                        <input type="radio" id="health" name="unhealthy" value="false" onChange={handleHealthyChange} />
                        Unhealthy
                    </label>

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
        </>
    );
};

export default SightingForm;