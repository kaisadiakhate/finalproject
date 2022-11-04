import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Checkbox from "@mui/material/Checkbox"

export default function BasicTable(props) {
  const [selectedFood, setSelectedFood] = React.useState([])

  function checkFood(food) {
    if (selectedFood.find((f) => food.foodname === f.foodname)) {
      setSelectedFood(selectedFood.filter((f) => f.foodname !== food.foodname))
    } else {
      setSelectedFood([...selectedFood, food])
    }
    console.log(selectedFood)
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <Table></Table>
              <TableCell>Foodname (100g serving)</TableCell>
              <TableCell align="right">Kokonaisenergia(kJ)</TableCell>
              <TableCell align="right">Proteiini(g)</TableCell>
              <TableCell align="right">Hiilarit(g)</TableCell>
              <TableCell align="right">Rasva(g)</TableCell>
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
                      checkFood(row)
                    }}
                    color="primary"
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.foodname}
                </TableCell>
                <TableCell align="right">{row.ENERC}</TableCell>
                <TableCell align="right">{row.PROT}</TableCell>
                <TableCell align="right">{row.CHOAVL}</TableCell>
                <TableCell align="right">{row.FAT}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <p>
        <ul>
          {selectedFood.map((food) => {
            return <li>{food.foodname}</li>
          })}
        </ul>
      </p>
    </>
  )
}
