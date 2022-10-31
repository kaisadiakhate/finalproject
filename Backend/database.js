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
  const client = await pool.connect();
  try {
    const res = await client.query(
      "SELECT foods.foodid, foodname,eufdname,bestloc from foods join foodnutrientvalues on foodnutrientvalues.foodid = foods.foodid where eufdname = 'ENERC' or eufdname = 'FAT' or eufdname = 'CHOAVL' or eufdname = 'PROT' or eufdname = 'SUGAR' order by foodname"
    );
    console.log("OK:", res.rows[0]);
    return res.rows;
  } catch (err) {
    console.log(err?.stack);
  }
}

module.exports = { readFoods };
