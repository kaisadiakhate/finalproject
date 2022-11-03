import React, { useState, useEffect } from "react";
import PriceNameTable from "../components/PriceNameTable";

export default function FoodsPage() {
  const [data, setFoods] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:4000/foods")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFoods(data);
        console.log("Data from api:", data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <PriceNameTable rows={data} />
    </div>
  );
}
