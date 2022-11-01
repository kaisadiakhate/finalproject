const dotenv = require("dotenv");
dotenv.config();

const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: 5432,
});

async function readFoods() {
  try {
    const res = await pool.query(
      "SELECT foods.foodid, foodname,eufdname,bestloc from foods join foodnutrientvalues on foodnutrientvalues.foodid = foods.foodid where eufdname = 'ENERC' or eufdname = 'FAT' or eufdname = 'CHOAVL' or eufdname = 'PROT' or eufdname = 'SUGAR' order by foodname"
    );
    console.log("OK:", res.rows[0]);
    return res.rows;
  } catch (err) {
    console.log(err?.stack);
  }
}

async function readFoodId(foodid) {
  try {
    const res = await pool.query(
      `SELECT foods.foodid, foodname,eufdname,bestloc from foods join foodnutrientvalues on foodnutrientvalues.foodid = foods.foodid where foods.foodid = $1 and (eufdname = 'ENERC' or eufdname = 'FAT' or eufdname = 'CHOAVL' or eufdname = 'PROT' or eufdname = 'SUGAR')`,
      [foodid]
    );
    return res.rows;
  } catch (err) {
    console.log(err?.stack);
  }
}

async function createFood(meal) {
  await pool.query(
    `with current_meal as (insert into meals (meal_name)
      VALUES ($1)
      returning meal_id
      )
      insert into meal_contents (meal_id, foodid, amount)
      VALUES
          ((select meal_id from current_meal), $2, $3)`,
    [meal.meal_name, meal.foodid, meal.amount]
  );
}

module.exports = { readFoods, readFoodId, createFood };
