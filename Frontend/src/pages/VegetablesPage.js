import React, { useState, useEffect } from "react";
import PriceNameTable from "../components/PriceNameTable"
export default function VegetablesPage() {
  const [vegetables, setVegetables] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:4000/store/vegetables")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setVegetables(data);
        console.log('Data from api:', data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <PriceNameTable rows={vegetables} />
    </div>
  );
}
