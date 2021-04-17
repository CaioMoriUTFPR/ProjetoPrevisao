const express = require('express')
const https = require('https')
const app = express()
const porta = 3000

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', function (req, res) {

    const consulta = req.body.buscacidade
    var chave = null

    const url = `https://api.hgbrasil.com/weather?key=${chave}&city_name=${consulta}`


    https.get(url, (respostaclima) => {
        console.log(respostaclima.statusCode)
        let chunk = [];
        respostaclima.on('data', function (data) {
            chunk.push(data)}).on('end', () => {
            let data = Buffer.concat(chunk)
            const dadosClima = JSON.parse(data)
            const nomeCidade = dadosClima.results.city
            const temperatura = dadosClima.results.temp
            const tempo = dadosClima.results.description
            res.write(`<h1> A temperatura em ${nomeCidade} e de ${temperatura}graus Celsius</h1>`)
            res.write(`<p>O tempo: ${tempo}</p>`)
            res.write('<img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Weather_Icons_-_hi_tsra.svg">')
            res.send()
        })
    })
})






app.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`))