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
              <TableCell padding="checkbox"></TableCell>
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
  );
}
