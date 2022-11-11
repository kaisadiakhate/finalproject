import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function SearchBar(props) {
  const [inputValue, setInputValue] = useState("");

  return (
    <Container className="my-4">
      <Typography
        variant="h5"
        variantMapping="h2"
        style={{ paddingBottom: "50px" }}
      ></Typography>
      <input
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
      ></input>

      <button onClick={(e) => props.searchCallback(inputValue)}>Hae</button>
    </Container>
  );
}
