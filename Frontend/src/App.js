import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import FrontPage from "./pages/FrontPage";
import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Menu from "./Menu";
import FruitPage from "./pages/FruitPage";
import VegetablesPage from "./pages/VegetablesPage";
import AddProductPage from "./pages/AddProductPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FrontPage />,
  },
  {
    path: "/fruits",
    element: <FruitPage />,
  },
  {
    path: "/vegetables",
    element: <VegetablesPage />,
  },
  {
    path: "/add-product",
    element: <AddProductPage />,
  },
]);

function App() {
  return (
    <React.StrictMode>
      <Container maxWidth="l">
        <Grid container spacing={2}>
          <Grid xs={4}>
            <div>
              <Menu />
            </div>
          </Grid>
          <Grid xs={8}>
            <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
              <RouterProvider router={router} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </React.StrictMode>
  );
}

export default App;
