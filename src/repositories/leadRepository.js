const db = require('../database/connection');

class LeadRepository {
    findAll() {
        return new Promise((res, rej) => {
            db.all("SELECT * FROM leads", [], (err, rows) => err ? rej(err) : res(rows));
        });
    }

    findById(id) {
        return new Promise((res, rej) => {
            db.get("SELECT * FROM leads WHERE id = ?", [id], (err, row) => err ? rej(err) : res(row));
        });
    }

    upsert(lead) {
        return new Promise((res, rej) => {
            const query = `INSERT INTO leads (contato, nome, ultima_mensagem, ultima_resposta, total_mensagens) 
                           VALUES (?, ?, ?, ?, 1)
                           ON CONFLICT(contato) DO UPDATE SET 
                           ultima_mensagem=excluded.ultima_mensagem,
                           ultima_resposta=excluded.ultima_resposta,
                           total_mensagens=total_mensagens + 1,
                           updated_at=CURRENT_TIMESTAMP`;
            db.run(query, [lead.contato, lead.nome, lead.ultima_mensagem, lead.ultima_resposta], function(err) {
                err ? rej(err) : res({ id: this.lastID });
            });
        });
    }

    update(id, leadData) {
        return new Promise((res, rej) => {
            const query = `UPDATE leads SET nome = ?, status = ?, ultima_mensagem = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
            db.run(query, [leadData.nome, leadData.status, leadData.ultima_mensagem, id], function(err) {
                err ? rej(err) : res({ changes: this.changes });
            });
        });
    }

    delete(id) {
        return new Promise((res, rej) => {
            db.run("DELETE FROM leads WHERE id = ?", [id], function(err) {
                err ? rej(err) : res({ changes: this.changes });
            });
        });
    }
}

module.exports = new LeadRepository();