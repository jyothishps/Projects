import pool from './db.js';

const createTable = async () => {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await pool.query(query);
        console.log("Users table created or already exists.");
        process.exit();
    } catch (error) {
        console.error("Error creating table:", error);
        process.exit(1);
    }
};

createTable();
