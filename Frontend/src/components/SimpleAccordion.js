import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export default function SimpleAccordion(props) {
  return (
    <div>
      {props.data.map((row) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              {row.meal_date.split("T")[0].replaceAll("-", ".")}
              {row.meal_name}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            {row.foods.map((row) => (
              <List>
                <ListItem
                  secondaryAction={
                    <IconButton
                      onClick={() => {
                        console.log("Delete!");
                      }}
                      edge="end"
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={row.foodname} />
                </ListItem>
              </List>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
