const dotenv = require("dotenv");
dotenv.config();

const { Pool, types } = require("pg");
const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: 5432,
});
types.setTypeParser(1700, function (val) {
  return parseFloat(val);
});

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
    );
    console.log("OK:", res.rows[0]);
    return res.rows;
  } catch (err) {
    console.log(err?.stack);
  }
}
async function searchFoods(foodname) {
  const res = await pool.query(
    `SELECT
    foodname,
    foodnutrientvalues.foodid,
    MAX(bestloc) FILTER (WHERE eufdname = 'ENERC') AS "ENERC",
    MAX(bestloc) FILTER (WHERE eufdname = 'PROT') AS "PROT",
    MAX(bestloc) FILTER (WHERE eufdname = 'CHOAVL') AS "CHOAVL",
    MAX(bestloc) FILTER (WHERE eufdname = 'FAT') AS "FAT"
  FROM foodnutrientvalues
  JOIN
	  foods on foods.foodid = foodnutrientvalues.foodid
  WHERE 
	  foods.foodname LIKE $1
  GROUP BY
    foodnutrientvalues.foodid,
    foods.foodname
    ORDER BY CHAR_LENGTH(foodname);`,
    [`%${foodname.toUpperCase()}%`]
  );
  return res.rows;
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
    );
    return res.rows;
  } catch (err) {
    console.log(err?.stack);
  }
}

async function createFood(meal) {
  const valueArray = [];
  for (const el in meal) {
    if (meal[el].hasOwnProperty("foodid"))
      valueArray.push(
        `((select meal_id from current_meal), ${meal[el].foodid}, ${meal[el].amount})`
      );
  }
  const mealQuery =
    "with current_meal as (insert into meals (meal_name) VALUES ($1) returning meal_id) insert into meal_contents (meal_id, foodid, amount) VALUES " +
    valueArray.join(", ");
  await pool.query(mealQuery, [meal.meal_name]);
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
      foods.foodid,
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
      foods.foodid,
      amount,
      foodname
    ORDER BY
      meal_date DESC;`);
    console.log(res.rows);
    return res.rows;
  } catch (err) {
    console.log(err?.stack);
  }
}

async function deleteMeal(mealid, foodid) {
  await pool.query(
    `DELETE FROM meal_contents WHERE meal_id = $1 AND foodid=$2`,
    [mealid, foodid]
  );
  return;
}

async function readMealId(mealid) {
  try {
    const res = await pool.query(`SELECT * FROM meals where meal_id=$1`, [
      mealid,
    ]);
    return res.rows;
  } catch (err) {
    console.log(err?.stack);
  }
}

module.exports = {
  readFoods,
  readFoodId,
  createFood,
  readDiary,
  deleteMeal,
  searchFoods,
  readMealId,
};
