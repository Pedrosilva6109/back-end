const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

// Cria a tabela automaticamente caso não exista
db.run(`CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contato TEXT UNIQUE,
    nome TEXT,
    tipo TEXT,
    etapa TEXT,
    status TEXT DEFAULT 'ativo',
    ultima_mensagem TEXT,
    ultima_resposta TEXT,
    total_mensagens INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

module.exports = db;