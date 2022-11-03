import React, { useState, useEffect } from "react"
import PriceNameTable from "../components/PriceNameTable"
export default function MealsPage() {
  const [meals, setMeals] = useState([])

  const fetchData = () => {
    fetch("http://localhost:4000/meals")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setMeals(data)
        console.log("Data from api:", data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  // return (
  //   <div>
  //     <PriceNameTable rows={meals} />
  //   </div>
  // )
}
