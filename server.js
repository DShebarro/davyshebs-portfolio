const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

// Initialize App
const app = express();
const PORT = 5000;

/* 
  ========================================
  MIDDLEWARE
  ========================================
  - CORS: Allow cross-origin requests
  - BodyParser: Parse JSON in request body
*/
app.use(cors());
app.use(bodyParser.json());

/* 
  ========================================
  DATABASE SETUP (SQLite)
  ========================================
*/
const db = new sqlite3.Database('./messages.db', (err) => {
    if (err) {
        console.error('❌ Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('✅ Conectado ao banco de dados SQLite.');
    }
});

// Initialize Table if not exists
db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

db.run(`CREATE TABLE IF NOT EXISTS site_stats (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    views INTEGER DEFAULT 0
)`);

// Initialize stats row if empty
db.get("SELECT count(*) as count FROM site_stats", (err, row) => {
    if (row && row.count === 0) {
        db.run("INSERT INTO site_stats (id, views) VALUES (1, 0)");
    }
});

/* 
  ========================================
  API ROUTES
  ========================================
*/

/**
 * @route   GET /
 * @desc    Check server status
 * @access  Public
 */
app.get('/', (req, res) => {
    res.send('Servidor Backend Funcionando! 🚀');
});

/**
 * @route   POST /api/messages
 * @desc    Save a new contact message to the database
 * @access  Public
 */
app.post('/api/messages', (req, res) => {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Por favor, preencha todos os campos.' });
    }

    const query = `INSERT INTO messages (name, email, message) VALUES (?, ?, ?)`;
    
    db.run(query, [name, email, message], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Erro ao salvar mensagem.' });
        }
        res.status(201).json({ id: this.lastID, message: 'Mensagem salva com sucesso!' });
    });
});

/**
 * @route   GET /api/messages
 * @desc    Retrieve all saved messages
 * @access  Public (In production, this should be protected)
 */
app.get('/api/messages', (req, res) => {
    const query = `SELECT * FROM messages ORDER BY date DESC`;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Erro ao buscar mensagens.' });
        }
        res.json(rows);
    });
});

/* 
  ========================================
  SERVER START
  ========================================
*/
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
