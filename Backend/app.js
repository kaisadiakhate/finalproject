const express = require("express")
const cors = require("cors")
const app = express()
const port = process.env.PORT || 4000
const {
  readFoods,
  readFoodId,
  createFood,
  readDiary,
  deleteMeal,
  searchFoods,
  readMealId,
} = require("./database")

app.use(cors())
app.use(express.json())

/*
app.get("/foods", async (req, res) => {
  try {
    const food = await readFoods();
    const response = { data: food };
    res.send(response);
  } catch (err) {
    console.log(err?.stack);
  }
});
*/

app.get("/", async (req, res) => {
  res.sendStatus(200)
})

app.get("/foods", async (req, res) => {
  if (!req.query.foodname) {
    res.json({ data: await readFoods() })
  } else {
    res.json({ data: await searchFoods(req.query.foodname) })
  }
})

app.get("/foods/:foodid", async (req, res) => {
  const foodid = req.params.foodid
  console.log(`Asked for foodid ${foodid}`)
  res.json(await readFoodId(foodid))
})

app.post("/addmeal", async (req, res) => {
  await createFood(req.body)
  res.sendStatus(200)
})

app.get("/meals", async (req, res) => {
  try {
    const diary = await readDiary()
    const sortByMeal = diary.reduce((carry, current) => {
      const { meal_id, meal_date, meal_name, ...food } = current
      let el = carry.find(
        (item) => item.meal_id === meal_id && meal_date === current.meal_date
      )
      if (!el) {
        el = { meal_id, meal_date, meal_name, foods: [] }
        carry.push(el)
      }
      el.foods.push({ meal_id, ...food })
      return carry
    }, [])
    const response = { data: sortByMeal }
    res.send(response)
  } catch (err) {
    console.log(err?.stack)
  }
})

app.get("/meals/:meal_id", async (req, res) => {
  const mealid = req.params.meal_id
  console.log(`Asked for mealid ${mealid}`)
  res.json(await readMealId(mealid))
})

app.delete("/meals/:meal_id/:foodid", async (req, res) => {
  await deleteMeal(req.params.meal_id, req.params.foodid)
  res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
