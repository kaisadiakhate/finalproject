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

async function main() {
  const client = await pool.connect()
  try {
    const res = await client.query("SELECT * from foods;")
    console.log("OK:", res.rows[0])
  } catch (err) {
    console.log(err?.stack)
  }
  client.release()
  pool.end()
}
main()
module.exports = {}
