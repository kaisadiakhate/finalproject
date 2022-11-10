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
      <h3 sx={{ m: 20 }}>{dashboard.dailyCalorieCount}</h3>
      <div
        style={{ fontSize: "30px", display: "flex", justifyContent: "center" }}
      >
        Kirjaa ylös päivittäiset ravinto-aineet ja kalorit
      </div>
      <div
        style={{
          fontSize: "20px",
          display: "flex",
          justifyContent: "center",
          margin: "5%",
        }}
      >
        Ruokapäiväkirjan avulla pystyt seuraamaan syömiäsi kaloreita ja
        ravinto-aineita. Ruokahausta näet yli 4000 ruoan ravintosisällön.
      </div>
      <span
        style={{ display: "flex", justifyContent: "center", margin: "5%" }}
      ></span>
    </div>
  );
}
