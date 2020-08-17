import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import Message from './db/Message.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.json('Hello and welcome to the message board 🎉');
})

app.get('/messages',(req,res)=>{
    Message.getAll().then((messages)=>{
        res.json(messages)
    })
})  

app.post('/messages',(req,res)=>{
    const message = req.body
    Message.create(message).then((resp)=> res.json(resp))
    .catch((err)=>{
        res.status(500)
        res.json(err)
    })
})


app.listen(PORT,()=>{
    console.log(`server running on PORT:${PORT}`);
})
