import { useState, useEffect } from "react";
import Form from "./form";

function Animals() {

    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5005/api/animals")
        .then((response) => response.json())
        .then(animals =>{
            // setAnimals((animals[3]));
            // console.log("Testing", typeof animals);
            for (let index in animals){
               if( index !== "3"){
                   setAnimals(animals);
               }
            };       
        })
        
    }, []);

    
    const addAnimals = (newAnimal) => {
        //console.log(newAnimal);
        //postStudent(newAnimal);
        setAnimals((animals) => [...animals, newAnimal]);
    }


    return (
      <div className="animals">
        <h2> List of Animals </h2>
        <ul>
            {animals.map(animal =>
                <li key={animal.id}> {animal.common_name} {animal.scientific_name}
                {animal.population} {animal.status_code}</li>)}
        </ul>
        <Form addAnimals={addAnimals} />
      </div>
    );
  }
  
  export default Animals;