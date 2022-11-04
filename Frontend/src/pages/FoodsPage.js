import React, { useState, useEffect } from "react";
import PriceNameTable from "../components/PriceNameTable";
import SearchBar from "../components/SearchBar";

export default function FoodsPage() {
  const [data, setFoods] = useState([]);
  const fetchData = (search) => {
    console.log(search);
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
      <SearchBar searchCallback={fetchData} />
      <PriceNameTable rows={data} />
    </div>
  );
}
