import { createPool } from 'mysql2';
import mysql2 from 'mysql2/promise';

const pool = mysql2.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'bernardo',
    database: 'obligatorio'
});

export default pool;