const dotenv = require("dotenv")
dotenv.config()

const { Pool } = require("pg")
const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: 5432,
})

async function readFoods() {
  try {
    const res = await pool.query(
      `select
        foodname,
        foodnutrientvalues.foodid,
        MAX(bestloc) FILTER (WHERE eufdname = 'ENERC') AS "ENERC",
        MAX(bestloc) FILTER (WHERE eufdname = 'PROT') AS "PROT",
        MAX(bestloc) FILTER (WHERE eufdname = 'CHOAVL') AS "CHOAVL",
        MAX(bestloc) FILTER (WHERE eufdname = 'FAT') AS "FAT"
      FROM foodnutrientvalues
      JOIN
        foods on foods.foodid = foodnutrientvalues.foodid
      GROUP BY
        foodnutrientvalues.foodid,
        foods.foodname
      ORDER BY
        foodid;`
    )
    console.log("OK:", res.rows[0])
    return res.rows
  } catch (err) {
    console.log(err?.stack)
  }
}
async function searchFoods(foodname) {
  const res = await pool.query(
    `select
    foodname,
    foodnutrientvalues.foodid,
    MAX(bestloc) FILTER (WHERE eufdname = 'ENERC') AS "ENERC",
    MAX(bestloc) FILTER (WHERE eufdname = 'PROT') AS "PROT",
    MAX(bestloc) FILTER (WHERE eufdname = 'CHOAVL') AS "CHOAVL",
    MAX(bestloc) FILTER (WHERE eufdname = 'FAT') AS "FAT"
  FROM foodnutrientvalues
  JOIN
    foods on foods.foodid = foodnutrientvalues.foodid
  WHERE foods.foodname like $1 OR foods.foodname like $2 OR foods.foodname like $3
  GROUP BY
    foodnutrientvalues.foodid,
    foods.foodname
  ORDER BY
    foodid;`[`%${foodname.toUpperCase()}%`]
  )
  return res.rows
}

async function readFoodId(foodid) {
  try {
    const res = await pool.query(
      `SELECT foods.foodid, foodname,eufdname,bestloc 
      from foods 
      join foodnutrientvalues on foodnutrientvalues.foodid = foods.foodid 
      where foods.foodid = $1 
      and (eufdname = 'ENERC' or eufdname = 'FAT' or eufdname = 'CHOAVL' or eufdname = 'PROT' or eufdname = 'SUGAR')`,
      [foodid]
    )
    return res.rows
  } catch (err) {
    console.log(err?.stack)
  }
}

async function createFood(meal) {
  await pool.query(
    `with current_meal as (insert into meals (meal_name)
      VALUES ($1)
      returning meal_id)
      insert into meal_contents (meal_id, foodid, amount)
      VALUES
          ((select meal_id from current_meal), $2, $3)`,
    [meal.meal_name, meal.foodid, meal.amount]
  )
}

async function readDiary() {
  try {
    const res = await pool.query(`
    SELECT
	    meals.meal_id,
	    meal_date,
      meal_name,
      amount,
      foodname,
      MAX(bestloc) FILTER (WHERE eufdname = 'ENERC') AS "ENERC",
      MAX(bestloc) FILTER (WHERE eufdname = 'PROT') AS "PROT",
      MAX(bestloc) FILTER (WHERE eufdname = 'CHOAVL') AS "CHOAVL",
      MAX(bestloc) FILTER (WHERE eufdname = 'FAT') AS "FAT"
    FROM meals
    JOIN meal_contents
      ON meal_contents.meal_id = meals.meal_id 
    JOIN foods
      ON foods.foodid = meal_contents.foodid
    JOIN foodnutrientvalues
      ON foods.foodid = foodnutrientvalues.foodid 
    GROUP BY 
      meals.meal_id,
      meal_date,
      meal_name,
      amount,
      foodname;`)
    console.log(res.rows)
    return res.rows
  } catch (err) {
    console.log(err?.stack)
  }
}

async function deleteMeal(mealid) {
  await pool.query(`DELETE FROM meals WHERE meal_id = $1`, [mealid])
  return
}

async function readDiary() {
  try {
    const res = await pool.query(`
    SELECT
	    meals.meal_id,
	    meal_date,
      meal_name,
      amount,
      foodname,
      MAX(bestloc) FILTER (WHERE eufdname = 'ENERC') AS "ENERC",
      MAX(bestloc) FILTER (WHERE eufdname = 'PROT') AS "PROT",
      MAX(bestloc) FILTER (WHERE eufdname = 'CHOAVL') AS "CHOAVL",
      MAX(bestloc) FILTER (WHERE eufdname = 'FAT') AS "FAT"
    FROM meals
    JOIN meal_contents
      ON meal_contents.meal_id = meals.meal_id 
    JOIN foods
      ON foods.foodid = meal_contents.foodid
    JOIN foodnutrientvalues
      ON foods.foodid = foodnutrientvalues.foodid 
    GROUP BY 
      meals.meal_id,
      meal_date,
      meal_name,
      amount,
      foodname;`)
    console.log(res.rows)
    return res.rows
  } catch (err) {
    console.log(err?.stack)
  }
}

module.exports = {
  readFoods,
  readFoodId,
  createFood,
  readDiary,
  deleteMeal,
  searchFoods,
}
