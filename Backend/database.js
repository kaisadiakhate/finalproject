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

/*
async function createFood(foodname) {
  console.log(foodname);
  let today = new Date();
  await pool.query(
    `INSERT INTO meals () VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      meals.
      today.toISOString(),
      meals.,
      meals.,
    ]
  );
}
*/

module.exports = { readFoods, readFoodId };
