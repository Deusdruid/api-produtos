const express = require('express')

const router = express.Router()

// Simulando banco de dados
let produtos = [
  { id: 1, nome: 'Mouse', preco: 10.99 },
  { id: 2, nome: 'Teclado', preco: 19.99 },
  { id: 3, nome: 'Monitor', preco: 50.49 }
]

// GET /produtos
router.get('/', (req, res) => {
  res.json(produtos)
})

// GET /produtos/:id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)

  const produto = produtos.find(produto => produto.id === id)

  if (!produto) {
    return res.status(404).json({
      message: 'Produto não encontrado'
    })
  }

  res.json(produto)
})

// POST /produtos
router.post('/', (req, res) => {
  const { nome, preco } = req.body

  if (!nome || !preco) {
    return res.status(400).json({
      message: 'Nome e preço são obrigatórios'
    })
  }

  const novoProduto = {
    id: produtos.length + 1,
    nome,
    preco
  }

  produtos.push(novoProduto)

  res.status(201).json(novoProduto)
})

// PUT /produtos/:id
router.put('/:id', (req, res) => {
  const id = Number(req.params.id)

  const { nome, preco } = req.body

  const produto = produtos.find(produto => produto.id === id)

  if (!produto) {
    return res.status(404).json({
      message: 'Produto não encontrado'
    })
  }

  produto.nome = nome
  produto.preco = preco

  res.json(produto)
})

// DELETE /produtos/:id
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)

  const produtoExiste = produtos.some(
    produto => produto.id === id
  )

  if (!produtoExiste) {
    return res.status(404).json({
      message: 'Produto não encontrado'
    })
  }

  produtos = produtos.filter(
    produto => produto.id !== id
  )

  res.json({
    message: 'Produto deletado com sucesso'
  })
})

module.exports = router