// import pg from 'pg';
// const { Pool } = pg;
// import dotenv from 'dotenv';

// dotenv.config();


// //Local
// // const pool = new Pool({
// //   user: process.env.DB_USER,
// //   host: process.env.DB_HOST,
// //   database: process.env.DB_NAME,
// //   password: process.env.DB_PASSWORD,
// //   port: process.env.DB_PORT,
// // });


// const pool = new Pool({
//   connectionString: "postgresql://postgres:[Pedro&cata9]@db.slxlssooqhfmoiuhkhzp.supabase.co:5432/postgres",
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });



// export default pool;

import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const sql = postgres(process.env.DATABASE_URL, {
  ssl: {
    rejectUnauthorized: false,
    mode: 'require'
  },
  transform: {
    undefined: null // Maneja valores undefined como NULL
  }
});

export default sql;