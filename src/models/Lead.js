class Lead {
    constructor(data) {
        this.contato = data.contato;
        this.nome = data.nome || 'Lead s/ Nome';
        this.ultima_mensagem = data.ultima_mensagem || '';
        this.ultima_resposta = data.ultima_resposta || '';
        this.status = data.status || 'ativo';
    }

    static isValid(data) {
        if (!data.contato || data.contato.length < 8) {
            return { valid: false, error: "Contato inválido ou ausente." };
        }
        return { valid: true };
    }
}

module.exports = Lead;