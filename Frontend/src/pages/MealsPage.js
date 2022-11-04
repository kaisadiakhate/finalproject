import React, { useState, useEffect } from "react";
import BasicCard from "../components/BasicCard";

//import PriceNameTable from "../components/PriceNameTable";
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
      <BasicCard />
    </div>
  );
}
