import * as React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

/*
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
*/
export default function BasicCard(props) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.data.meal_id}
        </Typography>
        <Typography variant="h5" component="div">
          {props.data.meal_date}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.meal_name}
        </Typography>
        <Typography variant="body2">
          {props.amount}
          <br />
          {props.foodname}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
