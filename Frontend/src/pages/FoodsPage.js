import React, { useState, useEffect } from "react"
import FoodsTable from "../components/FoodsTable"
import SearchBar from "../components/SearchBar"

export default function FoodsPage() {
  const [data, setFoods] = useState([])
  const fetchData = (search) => {
    fetch(
      "http://localhost:4000/foods?" +
        new URLSearchParams({
          foodname: search,
        })
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setFoods(data.data)
        console.log("Data from api:", data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <h2>Etsi tietokannasta ruoka/raaka-aine</h2>
      <SearchBar searchCallback={fetchData} />
      <FoodsTable rows={data} />
    </div>
  )
}
