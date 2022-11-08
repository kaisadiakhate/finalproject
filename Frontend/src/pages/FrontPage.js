import React, { useEffect, useState } from "react";

export default function FrontPage() {
  const [dashboard, setDashboard] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:4000/dashboard")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDashboard(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="background">
        <h3 sx={{ m: 20 }}>Ruokapäiväkirja {dashboard.dailyCalorieCount}</h3>
        <div>Kirjaa ylös päivittäiset ravinto-aineet ja kalorit</div>
        <span
          style={{ display: "flex", justifyContent: "center", margin: "5%" }}
        ></span>
    </div>
  );
}
