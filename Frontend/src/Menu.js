import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import FoodBankIcon from "@mui/icons-material/FoodBank";

export default function Menu(props) {
  if (props.menuType === "horizontal") {
    return (
      <Stack direction="row" spacing={2} sx={{ bgcolor: "background.paper" }}>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/">
            <ListItemText primary="Etusivu" />
            <FoodBankIcon />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="foods">
            <ListItemText primary="Hae ruokia" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="meals">
            <ListItemText primary="Seuranta" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="addmeal">
            <ListItemText primary="Lisää ateria" />
          </ListItemButton>
        </ListItem>
      </Stack>
    );
  }

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <List sx={{ p: 0, m: 0 }}>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/">
            <ListItemText primary="Etusivu" />
            <FoodBankIcon />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="foods">
            <ListItemText primary="Hae ruokia" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="meals">
            <ListItemText primary="Seuranta" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="addmeal">
            <ListItemText primary="Lisää ateria" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
