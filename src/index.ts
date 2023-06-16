import express from 'express'
import cors from "cors"

const app = express()
app.use(express.json())

const PORT = 3008

// app.use(cors)

app.get("/ping", (req, res) => {
    console.log('damos ping')
    res.setHeader("Content-Type", "application/json")
    res.send("pong")
})

app.get("/hola/:nombre/:apellido", (req, res) => {
    console.log('damos ping')
    res.send({ pong: "pong" , nombre: req.params.nombre, apellido: req.params.apellido })
})

app.listen(PORT, () => {
    console.log('Esta corriendo en puerto', PORT)
})