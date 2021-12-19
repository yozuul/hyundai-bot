import {} from 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { darkGray, red } from 'ansicolor'

import { userRouter, carRouter, settingsRouter } from './routes'

// import { errorMiddleware } from './middlewares'

const PORT = process.env.API_PORT
const app = express()

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(express.json())
app.use('/users', userRouter)
app.use('/cars', carRouter)
app.use('/settings', settingsRouter)
// app.use(errorMiddleware)

const startServer = async () => {
    try {
        app.listen(PORT, () => {
        console.log((`Сервер запущен на порту ${PORT}`).darkGray)
    })
    } catch (err) {
        console.log(err)
        console.log(('Ошибка запуска сервера').red);
    }
}

startServer()