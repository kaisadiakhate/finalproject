import * as React from "react";
import Container from "@mui/material/Container";
import { useState } from "react";

export default function SearchBar(props) {
  const [inputValue, setInputValue] = useState("");

  return (
    <Container className="my-4">
      <input
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
      <button onClick={(e) => props.searchCallback(inputValue)}>Etsi</button>
    </Container>
  );
}
