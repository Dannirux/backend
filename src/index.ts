import express from 'express'
import cors from "cors"
import restify from "restify"

const app = restify.createServer();

app.use(restify.plugins.bodyParser());
// const app = express()
// app.use(express.json())

const PORT = 3008

// app.use(cors)

app.get("/ping", (req, res, next) => {
    console.log('damos ping')
    res.setHeader("Content-Type", "application/json")
    res.send("pong")
})

app.post('/ejemplo', (req:any, res, next) => {
    console.log('damos ping', req.files, req.body)
    // Realizar alguna lógica con los datos recibidos
    // ...
  
    res.send({ mensaje: 'Solicitud POST exitosa' });
  });

app.get("/hola/:nombre/:apellido", (req:any, res, next) => {
    console.log('damos ping', req.files)
    res.send({ pong: "pong" , nombre: req.params.nombre, apellido: req.params.apellido })
})

app.listen(PORT, () => {
    console.log('Esta corriendo en puerto', PORT)
})