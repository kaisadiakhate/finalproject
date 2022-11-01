const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const { readFoods, readFoodId } = require("./database");

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const food = await readFoods();
    const response = { data: food };
    res.send(response);
  } catch (err) {
    console.log(err?.stack);
  }
});

app.get("/:foodid", async (req, res) => {
  const foodid = req.params.foodid;
  console.log(`Asked for foodid ${foodid}`);
  res.json(await readFoodId(foodid));
});

/*
app.post("/search", async (req, res) => {
  await createFood(req.body);
  res.sendStatus(200);
});
*/
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
