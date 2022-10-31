const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;
const { readFoods } = require("./database");

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const food = await readFoods();
  const response = { data: food };
  res.send(response);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
