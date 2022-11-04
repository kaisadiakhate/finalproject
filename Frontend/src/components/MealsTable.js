import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Pvm</TableCell>
            <TableCell align="right">Ruokailu</TableCell>
            <TableCell align="right">Määrä (100g)</TableCell>
            <TableCell align="right">Annos</TableCell>
            <TableCell align="right">Energia (kJ)</TableCell>
            <TableCell align="right">Proteiinit</TableCell>
            <TableCell align="right">Kokonaishiilihydraatit</TableCell>
            <TableCell align="right">Rasvat</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow
              key={row.foodname}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.meal_date.split("T")[0]}
              </TableCell>
              <TableCell align="right">{row.meal_name}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.foodname}</TableCell>
              <TableCell align="right">{row.ENERC}</TableCell>
              <TableCell align="right">{row.PROT}</TableCell>
              <TableCell align="right">{row.CHOAVL}</TableCell>
              <TableCell align="right">{row.FAT}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
