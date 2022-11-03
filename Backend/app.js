const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;
const {
  readFoods,
  readFoodId,
  createFood,
  readDiary,
  deleteMeal,
} = require("./database");

app.use(cors());
app.use(express.json());

app.get("/foods", async (req, res) => {
  try {
    const food = await readFoods();
    const response = { data: food };
    res.send(response);
  } catch (err) {
    console.log(err?.stack);
  }
});

app.get("/foods/:foodid", async (req, res) => {
  const foodid = req.params.foodid;
  console.log(`Asked for foodid ${foodid}`);
  res.json(await readFoodId(foodid));
});

app.post("/meals", async (req, res) => {
  await createFood(req.body);
  res.sendStatus(200);
});

app.get("/meals", async (req, res) => {
  try {
    const diary = await readDiary();
    const response = { data: diary };
    res.send(response);
  } catch (err) {
    console.log(err?.stack);
  }
});

app.delete("/meals/:meal_id", async (req, res) => {
  await deleteMeal(req.params.meal_id);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
