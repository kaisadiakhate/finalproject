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
    <div>
      Hello front page! { dashboard.dailyCalorieCount }
    </div>
  );
}
