const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const { readFoods, readFoodId, createFood, readDiary } = require("./database");

app.use(cors());
app.use(express.json());

app.get("/food", async (req, res) => {
  try {
    const food = await readFoods();
    const response = { data: food };
    res.send(response);
  } catch (err) {
    console.log(err?.stack);
  }
});

app.get("/food/:foodid", async (req, res) => {
  const foodid = req.params.foodid;
  console.log(`Asked for foodid ${foodid}`);
  res.json(await readFoodId(foodid));
});

app.post("/diary", async (req, res) => {
  await createFood(req.body);
  res.sendStatus(200);
});

app.get("/diary", async (req, res) => {
  try {
    const diary = await readDiary();
    const response = { data: diary };
    res.send(response);
  } catch (err) {
    console.log(err?.stack);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
