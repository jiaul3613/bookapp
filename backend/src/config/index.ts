import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
    path: path.join(process.cwd(), '.env')
});

const config = {
    prot: process.env.PORT,
    node_env:process.env.NODE_ENV,
    connection_string: process.env.DATABASE_URL as string,
    jwt_secret: process.env.JWT_SECRET,
    
}

export default config;