import * as React from "react"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import FoodBankIcon from "@mui/icons-material/FoodBank"

export default function Menu() {
  return (
    <div>
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <nav aria-label="secondary mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton component="a" href="/">
                <ListItemText primary="Etusivu" />
                <FoodBankIcon />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="foods">
                <ListItemText primary="Foods" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="meals">
                <ListItemText primary="Meals" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="addmeal">
                <ListItemText primary="Lisää ateria" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
    </div>
  )
}
