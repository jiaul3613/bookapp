import express, { Application, Request, Response } from 'express';
import cors from 'cors'
import authRouter from './modules/auth/auth.router';
import bookRouter from './modules/books/book.route'
const app: Application = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))




app.get('/', (req :Request,res: Response) => {
    res.send('Hello world')
})

app.use('/api/auth', authRouter)
app.use('/api/books', bookRouter)

export default app;

