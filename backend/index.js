const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(bodyParser.json());

/**
 * In-memory stores for demo.
 * Replace with PostgreSQL + Redis in production.
 */
const users = {};
const products = {
  "p1": { id: "p1", name: "Sample Product A", likes: 0 },
  "p2": { id: "p2", name: "Sample Product B", likes: 0 }
};
const carts = {};
const sessions = {};

/* Health */
app.get('/health', (req,res)=>res.json({ok:true}));

/* Public: list products */
app.get('/products', (req,res)=>{
  res.json(Object.values(products));
});

/* Like a product */
app.post('/products/:id/like', (req,res)=>{
  const id = req.params.id;
  if (!products[id]) return res.status(404).json({error:"not found"});
  products[id].likes += 1;
  res.json({ok:true, likes: products[id].likes});
});

/* Cart: add item (requires header x-user-id for demo) */
app.post('/cart/add', (req,res)=>{
  const user = req.header('x-user-id') || 'anonymous';
  if (!carts[user]) carts[user] = [];
  carts[user].push(req.body);
  res.json({ok:true, cart: carts[user]});
});

/* Simple auth: register/login (demo only) */
app.post('/auth/register', (req,res)=>{
  const id = uuidv4();
  users[id] = {...req.body, id, createdAt: Date.now()};
  return res.json({ok:true, userId: id});
});
app.post('/auth/login', (req,res)=>{
  // demo: accept any email
  const sid = uuidv4();
  sessions[sid] = {user: req.body.email || 'guest'};
  return res.json({ok:true, token: sid});
});

/* Checkout placeholder */
app.post('/checkout/create', (req,res)=>{
  // create order and return a fake payment_url
  const orderId = uuidv4();
  res.json({ok:true, orderId, payment_url: "https://example.payment/" + orderId});
});

/* AI endpoint (free feature) - simple echo / suggestion */
app.post('/ai/query', (req,res)=>{
  const q = req.body.q || '';
  // basic safety: deny illegal topics (demo)
  const denied = ['bomb','illegal','hack'];
  for (const d of denied) {
    if (q.toLowerCase().includes(d)) return res.status(400).json({error:"query not allowed"});
  }
  res.json({ok:true, answer: "Demo AI: We suggest product p1 for query: " + q});
});

const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log('backend listening on', port));