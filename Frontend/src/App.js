import React from "react"
import "./App.css"
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom"
import { Box, Container } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import Menu from "./Menu"
import FrontPage from "./pages/FrontPage"
import FoodsPage from "./pages/FoodsPage"
import MealsPage from "./pages/MealsPage"
import AddMealPage from "./pages/AddMealPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <FrontPage />,
  },
  {
    path: "/foods",
    element: <FoodsPage />,
  },
  {
    path: "/meals",
    element: <MealsPage />,
  },
  {
    path: "/addmeal",
    element: <AddMealPage />,
  },
])

function App() {
  return (
    <React.StrictMode>
      <Container maxWidth="l">
        <Grid container spacing={2}>
          <Grid xs={2}>
            <div>
              <Menu />
            </div>
          </Grid>
          <Grid xs={10}>
            <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
              <RouterProvider router={router} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </React.StrictMode>
  )
}

export default App
