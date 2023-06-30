import express from 'express'
import cors from "cors"
import restify from "restify"
import { Configuration, OpenAIApi } from 'openai'

const apiKey = process.env.OPENAI_API_KEY || ''

const app = restify.createServer();

const configuration = new Configuration({
    apiKey
  })

const openai = new OpenAIApi(configuration);

app.use(restify.plugins.bodyParser());
// const app = express()
// app.use(express.json())

const PORT = 3008

app.use(cors())

app.get("/ping", (req, res, next) => {
    console.log('damos ping')
    res.setHeader("Content-Type", "application/json")
    res.send("pong")
})

app.get("/hola/:nombre/:apellido", (req:any, res, next) => {
    console.log('damos ping', req.files)
    res.send({ pong: "pong" , nombre: req.params.nombre, apellido: req.params.apellido })
})

app.post('/chat', async (req, res, next) => {
    try {
        const { message } = req.body
        console.log("message:***", message)
  
    // Realiza la solicitud al modelo de ChatGPT
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        temperature: 0.1,
        max_tokens: 150,
        n: 1,
    })
  
    // Retorna la respuesta generada por el modelo
    res.json({ reply: response.data.choices[0].text?.trim() });
    } catch (err) {
        next(err)
    }
  });

app.listen(PORT, () => {
    console.log('Esta corriendo en puerto', PORT)
})