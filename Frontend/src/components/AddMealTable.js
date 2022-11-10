import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { useForm } from "react-hook-form";

export default function AddMealTable(props) {
  const { register, handleSubmit } = useForm();
  const [selectedFood, setSelectedFood] = React.useState([]);

  const onSubmit = (data) => {
    console.log("Received on submit:", data);
  };

  function checkFood(food) {
    if (selectedFood.find((f) => food.foodname === f.foodname)) {
      setSelectedFood(selectedFood.filter((f) => f.foodname !== food.foodname));
    } else {
      setSelectedFood([...selectedFood, food]);
    }
    console.log(selectedFood);
  }
  return (
    <>
      {selectedFood.length > 0 && (
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
            fetch("http://localhost:4000/addmeal", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });
          })}
        >
          <p>
            <select {...register("meal_name")}>
              <option>Aamupala</option>
              <option>Lounas</option>
              <option>Illallinen</option>
              <option>Välipala</option>
            </select>
            <ul>
              {selectedFood.map((food, index) => {
                return (
                  <li key={food.foodid}>
                    {food.foodname[0].toUpperCase() +
                      food.foodname.slice(1).toLowerCase()}{" "}
                    <input
                      type="hidden"
                      {...register(`${index}.foodid`, {
                        valueAsNumber: true,
                      })}
                      value={food.foodid}
                    />
                    <input
                      type="hidden"
                      {...register(`${index}.foodname`)}
                      value={food.foodname}
                    />
                    <input
                      type="number"
                      {...register(`${index}.amount`, {
                        valueAsNumber: true,
                      })}
                      placeholder="Määrä /100g"
                    ></input>
                  </li>
                );
              })}
            </ul>
            <input type="submit" value="Lisää valintasi päivän aterioihin" />
          </p>
        </form>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <Table></Table>
              <TableCell>Ruoka (100g)</TableCell>
              <TableCell align="right">Kokonaisenergia (kcal)</TableCell>
              <TableCell align="right">Proteiini (g)</TableCell>
              <TableCell align="right">Hiilarit (g)</TableCell>
              <TableCell align="right">Rasva (g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row) => (
              <TableRow
                key={row.foodname}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    onChange={() => {
                      checkFood(row);
                    }}
                    color="primary"
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.foodname[0].toUpperCase() +
                    row.foodname.slice(1).toLowerCase()}
                </TableCell>
                <TableCell align="right">
                  {(Number(row.ENERC) / 4.18).toFixed(0)}
                </TableCell>
                <TableCell align="right">{row.PROT}</TableCell>
                <TableCell align="right">{row.CHOAVL}</TableCell>
                <TableCell align="right">{row.FAT}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
