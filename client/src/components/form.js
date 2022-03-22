import { useState } from "react";

const Form = (props) => {
    const [sighting, setSighting] = useState({
        date: "", //date
        time: "", //time
        individual: "", //string - dropdown?
        location: "", // string or num format
        isHealthy: "", //boolean but not
        email: "", //email format
        recordCreationTimestamp: "" //optional
    });

    // // maybe handle inputs together?
    // const handleChange = (event) => {
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     setInputs(values => ({...values, [name]: value}))
    //   }

    //create functions that handle the event of the user typing into the form
    const handleDateChange = (event) => {
        const date = event.target.value;
        setSighting((sighting) => ({ ...sighting, date }));
    }

    const handleTimeChange = (event) => {
        const time = event.target.value;
        setSighting((sighting) => ({ ...sighting, time }));
    }

    const handleIndividualChange = (event) => {
        const individual = event.target.value;
        setSighting((sighting) => ({ ...sighting, individual }));
    }

    const handleLocationChange = (event) => {
        const location = event.target.value;
        setSighting((sighting) => ({ ...sighting, location }));
    }

    const handleIsHealthyChange = (event) => {
        const isHealthy = event.target.value;
        setSighting((sighting) => ({ ...sighting, isHealthy }));
    }

    const handleEmailChange = (event) => {
        const email = event.target.value;
        setSighting((sighting) => ({ ...sighting, email }));
    }

    const handleTimestampChange = (event) => {
        const recordCreationTimestamp = event.target.value;
        setSighting((sighting) => ({ ...sighting, recordCreationTimestamp }));
    }

    // //A function to handle the post request
    // const postStudent = (newStudent) => {
    //     return fetch('http://localhost:5005/api/students', {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'}, 
    //     body: JSON.stringify(newStudent)
    //   }).then((response) => {
    //       return response.json()
    //   }).then((data) => {
    //     console.log("From the post ", data);
    //     props.addStudent(data);
      
    // });
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     postStudent(student);
        
    // };

    return (
        // <form onSubmit={handleSubmit}>
        <form>
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
                <select value={sighting.individual} required onChange={handleIndividualChange}>
                    <option value="individualName1">Name1</option>
                    <option value="individualName2">Name2</option>
                    <option value="individualName3">Name3</option>
                </select>
                {/* <input
                    type="text"
                    id="add-user-name"
                    placeholder="First Name"
                    required
                    value={student.name}
                    onChange={handleNameChange}
                /> */}

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
                <select value={sighting.isHealthy} onChange={handleIsHealthyChange}>
                    <option value="healthy">Healthy</option>
                    <option value="notHealthy">Not Healthy</option>
                </select>
                {/* <input
                    type="text"
                    id="add-user-name"
                    placeholder="First Name"
                    required
                    value={sighting.isHealthy}
                    onChange={handleIsHealthyChange}
                /> */}

                <label>Email of Sighter</label>
                <input
                    type="email"
                    id="add-email"
                    placeholder="Enter email"
                    required
                    value={sighting.email}
                    onChange={handleEmailChange}
                />

                {/* need to fix type */}
                <label>Record Creation Timestamp (optional)</label>
                <input
                    type="text"
                    id="add-timestamp"
                    placeholder=""
                    value={sighting.recordCreationTimestamp}
                    onChange={handleTimestampChange}
                />
            </fieldset>
            <button type="submit">Add Sighting</button>
        </form>
    );
};

export default Form;