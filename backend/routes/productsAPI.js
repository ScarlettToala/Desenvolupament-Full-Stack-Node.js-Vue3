import express from 'express'
import DBLocal from 'db-local'
import crypto from 'node:crypto'
import requireAuth from '../middleware/requireAuth.js'

const router = express.Router()
const { Schema } = new DBLocal({ path: './db' }) // tu JSON

const Product = Schema('db', {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true }
})

// ===== GET ALL PRODUCTS =====
router.get('/',  (req, res) => {
  const products = Product.find()
  res.json(products)
})

// ===== GET PRODUCT BY ID =====
router.get('/:id', (req, res) => {
  const product = Product.findOne({ id: Number(req.params.id) })
  if (!product) return res.status(404).json({ error: 'Product not found' })
  res.json(product)
})

// ===== CREATE PRODUCT =====
router.post('/', requireAuth, (req, res) => {
  const { name, price, category } = req.body
  const id = crypto.randomUUID()
  const newProduct = Product.create({ id, name, price, category })
  newProduct.save()
  res.status(201).json(newProduct)
})

// ===== UPDATE PRODUCT =====
router.put('/:id', requireAuth, (req, res) => {
  const product = Product.findOne({ id: Number(req.params.id) })
  if (!product) return res.status(404).json({ error: 'Product not found' })

  const { name, price, category } = req.body
  product.name = name ?? product.name
  product.price = price ?? product.price
  product.category = category ?? product.category
  product.save()

  res.json(product)
})

// ===== DELETE PRODUCT =====
router.delete('/:id', requireAuth, (req, res) => {
  const product = Product.findOne({ id: Number(req.params.id) })
  if (!product) return res.status(404).json({ error: 'Product not found' })

  product.remove()
  res.json({ success: true })
})

export default router
