import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Menu from "./Menu";
import FrontPage from "./pages/FrontPage";
import FoodsPage from "./pages/FoodsPage";
import MealsPage from "./pages/MealsPage";
import AddMealPage from "./pages/AddMealPage";
import "./components/HeaderImg";
import { HeaderImg } from "./components/HeaderImg";
//import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PageContainer menuType="horizontal" pageComponent={<FrontPage />} />
    ),
  },
  {
    path: "/foods",
    element: <PageContainer pageComponent={<FoodsPage />} />,
  },
  {
    path: "/meals",
    element: <PageContainer pageComponent={<MealsPage />} />,
  },
  {
    path: "/addmeal",
    element: <PageContainer pageComponent={<AddMealPage />} />,
  },
]);

/*

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
*/

function PageContainer(props) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <HeaderImg title="Ruokapäiväkirja" />
        </Grid>
        <Grid xs={props.menuType === "horizontal" ? 12 : 2}>
          <Menu menuType={props.menuType} />
        </Grid>
        <Grid xs={props.menuType === "horizontal" ? 12 : 10}>
          <Box sx={{ bgcolor: "background.paper", p: 0.5 }}>
            {props.pageComponent}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

function App() {
  return (
    <div id="home-page">
      <Container maxWidth="lg">
        <RouterProvider router={router} />
      </Container>
    </div>
  );
}

export default App;
