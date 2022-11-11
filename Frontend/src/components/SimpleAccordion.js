import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";

function calcSum(arr, nutr) {
  let x = 0;
  for (const el of arr) {
    x += el[nutr];
  }
  return x;
}

export default function SimpleAccordion(props) {
  return (
    <div style={{ paddingTop: "30px" }}>
      {props.data.map((row) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              style={{
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              {new Date(row.meal_date).toLocaleDateString("fi-FI")}
            </Typography>
            <Typography sx={{ pl: 3 }}>
              {" " +
                row.meal_name[0].toUpperCase() +
                row.meal_name.slice(1).toLowerCase()}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Ruoka</TableCell>
                  <TableCell align="right">Määrä (g)</TableCell>
                  <TableCell align="right">Energia (kcal)</TableCell>
                  <TableCell align="right">Proteiini (g)</TableCell>
                  <TableCell align="right">
                    Kokonaishiilihydraatti (g)
                  </TableCell>
                  <TableCell align="right">Rasva (g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.foods.map((row) => (
                  <TableRow key={row.foodname}>
                    <TableCell component="th" scope="row">
                      {row.foodname[0].toUpperCase() +
                        row.foodname.slice(1).toLowerCase()}
                    </TableCell>
                    <TableCell align="right">{row.amount * 100}</TableCell>
                    <TableCell align="right">
                      {(row.ENERC / 4.18).toFixed()}
                    </TableCell>
                    <TableCell align="right">{row.PROT}</TableCell>
                    <TableCell align="right">{row.CHOAVL}</TableCell>
                    <TableCell align="right">{row.FAT}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={async () => {
                          await fetch(
                            `http://localhost:4000/meals/${row.meal_id}/${row.foodid}`,
                            {
                              method: "DELETE",
                              headers: { "Content-Type": "application/json" },
                            }
                          );
                          props.fetchData();
                        }}
                        edge="end"
                        aria-label="delete"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow key={"yhteensä"}>
                  <TableCell align="right">Yhteensä</TableCell>
                  <TableCell align="right">
                    {(calcSum(row.foods, "amount") * 100).toFixed(0)}
                  </TableCell>
                  <TableCell align="right">
                    {(calcSum(row.foods, "ENERC") / 4.18).toFixed(0)}
                  </TableCell>
                  <TableCell align="right">
                    {calcSum(row.foods, "PROT").toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    {calcSum(row.foods, "CHOAVL").toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    {calcSum(row.foods, "FAT").toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
