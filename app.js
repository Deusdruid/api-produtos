const express = require('express')

const app = express()
app.use(express.json())


app.get('/', (req, res) => {
  res.send('API funcionando!')
})

// Simulando um banco de dados com um array //

const produtos = [
  { id: 1, nome: 'Mouse', preco: 10.99 },
  { id: 2, nome: 'Teclado', preco: 19.99 },
  { id: 3, nome: 'Monitor', preco: 50.49 }
]

// Rotas para produtos //

app.get('/produtos', (req, res) => {
  res.json(produtos)
})

// Rota para obter um produto por ID //

app.get('/produtos/:id', (req, res) => {
  const id = Number(req.params.id)
// Encontrando o produto pelo ID //

  const produto = produtos.find((produto) => {
    return produto.id === id
  })
// Verificando se o produto existe //

  if (!produto) {
    return res.status(404).json({ message: 'Produto não encontrado' })
  }
  res.json(produto)
})

// Rota para criar um novo produto //

app.post('/produtos', (req, res) => {
  const { nome, preco } = req.body
  if (!nome || !preco) {
    return res.status(400).json({ message: 'Nome e preço são obrigatórios' })
  }
// Criando um novo produto com um ID único //

  const novoProduto = {
    id: produtos.length + 1,
    nome,
    preco
  }
  produtos.push(novoProduto)
  res.status(201).json(novoProduto)
})

// Rota para atualizar um produto existente //
app.put('/produtos/:id', (req, res) => {
  const id = Number(req.params.id)

  const { nome, preco } = req.body
// Verificando se o produto existe //
  const produto = produtos.find(produto => produto.id === id)
// Se o produto não existir, retorna um erro 404 //
  if (!produto) {
    return res.status(404).json({
      message: 'Produto não encontrado'
    })
  }
// Atualizando o produto com os novos dados //
  produto.nome = nome
  produto.preco = preco

  res.json(produto)
})

// Rota para deletar um produto //
app.delete('/produtos/:id', (req, res) => {
  const id = Number(req.params.id)
// Verificando se o produto existe //
  const produtoExiste = produtos.some(produto => produto.id === id)
// Se o produto não existir, retorna um erro 404 //
  if (!produtoExiste) {
    return res.status(404).json({
      message: 'Produto não encontrado'
    })
  }

  produtos = produtos.filter(produto => produto.id !== id)

  res.json({
    message: 'Produto deletado com sucesso'
  })
})

// Iniciando o servidor na porta 3000 //
app.listen(3000, () => {
  console.log("Servidor rodando.")
})
