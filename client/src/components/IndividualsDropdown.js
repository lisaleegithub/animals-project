import { useState, useEffect } from "react";

const IndividualsDropdown = (prop) => {
  const [individuals, setIndividuals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5005/individuals")
      .then((response) => response.json())
      .then((individuals) => {
        setIndividuals(individuals);
      });
  }, []);

  return (
    <div>
      <select onChange={prop.handleIndividual} required>
        {individuals.map((individual) => (
          <option value={individual.id} key={individual.id}>
            {individual.nickname}
          </option>
        ))}
      </select>
    </div>
  );
};
export default IndividualsDropdown;