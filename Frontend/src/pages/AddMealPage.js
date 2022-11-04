import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";

export default function AddProductPage() {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  return (
    <Box
      component="form"
      onSubmit={handleSubmit((data) => {
        setData(JSON.stringify(data));
        fetch("http://localhost:4000/addmeal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      })}
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField {...register("meal_name")} label="Ateria" variant="outlined" />
      <TextField {...register("foodid")} label="Ruokalaji" variant="outlined" />
      <TextField {...register("amount")} label="Määrä" variant="outlined" />
      <Button type="submit" variant="contained">
        Lisää
      </Button>
    </Box>
  );
}
