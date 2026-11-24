import { pool } from ".";

export const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS book_users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(150) NOT NULL,
                role VARCHAR(30) DEFAULT 'member',
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);
        // await pool.query(`
        //     CREATE TABLE IF NOT EXISTS BOOKS(
        //     ID SERIAL PRIMARY KEY,
        //     TITLE VARCHAR2(100) NOT NULL,
        //     DESCRIPTION VARCHAR2(200) NOT NULL,
        //     AUTHOR VARCHAR2(150) NOT NULL,
        //     ISBN VARCHAR2(50) UNIQUE NOT NULL,
        //     TOTAL_COPIES INT NOT NULL CHECK(TOTAL_COPIES>=0),
        //     AVAILABLE_COMPES INT NOT NULL CHECK(TOTAL_COPIES>=0),
        //     created_at TIMESTAMP DEFAULT NOW(),
        //     updated_at TIMESTAMP DEFAULT NOW()
        //     );
        //     `)
        console.log("Users table initialized successfully");
    } catch (error) {
        console.error("Failed to initialize database:", error);
    }
};