import React, { useState, useEffect } from "react";
import PriceNameTable from "../components/PriceNameTable";

export default function FruitPage() {
  const [fruits, setFruits] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:4000/store/fruit")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFruits(data);
        console.log('Data from api:', data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <PriceNameTable rows={fruits} />
    </div>
  );
}
