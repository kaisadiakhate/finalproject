import React, { useState, useEffect } from "react";
import SimpleAccordion from "../components/SimpleAccordion";

export default function MealsPage() {
  const [data, setMeals] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:4000/meals")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMeals(data.data);
        console.log("Data from api:", data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Kaikki ateriat</h2>
      <SimpleAccordion data={data} fetchData={fetchData} />
    </div>
  );
}
