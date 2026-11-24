import app from './app'
import config from './config'
import { pool } from './db'
import { initDB } from './db/initDB'


const main = async () => {   
    initDB();
    
    try {
        const time = await pool.query(`SELECT NOW()`)
        console.log('Database connected successfully on :',time.rows[0].now);
        
        app.listen(config.prot, () => {
            console.log(`App listening on port : ${config.prot}`)
        })
    } catch (error) {
        console.error('Failed to start server',error);

    }

}

main()
    
