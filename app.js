const express = require('express')

const app = express()

app.use(express.json())

const produtosRoutes = require('./routes/produtos')

app.get('/', (req, res) => {
  res.send('API funcionando!')
})

app.use('/produtos', produtosRoutes)

app.listen(3000, () => {
  console.log('Servidor rodando.')
})