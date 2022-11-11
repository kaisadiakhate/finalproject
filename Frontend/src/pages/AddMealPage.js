import React, { useState, useEffect } from "react";

import AddMealTable from "../components/AddMealTable";
import SearchBar from "../components/SearchBar";

export default function AddMealPage() {
  const [data, setFoods] = useState([]);
  const fetchData = (search) => {
    fetch(
      "http://localhost:4000/foods?" +
        new URLSearchParams({
          foodname: search,
        })
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFoods(data.data);
        console.log("Data from api:", data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Lisää ateria</h2>
      <SearchBar searchCallback={fetchData} />
      <AddMealTable rows={data} />
    </div>
  );
}
