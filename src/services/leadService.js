const LeadRepository = require('../repositories/leadRepository');
const Lead = require('../models/Lead');

class LeadService {
    async getAllLeads() {
        return await LeadRepository.findAll();
    }

    async getLeadById(id) {
        const lead = await LeadRepository.findById(id);
        if (!lead) throw new Error("Lead não encontrado");
        return lead;
    }

    async processLead(rawData) {
        const validation = Lead.isValid(rawData);
        if (!validation.valid) throw new Error(validation.error);

        const leadModel = new Lead(rawData);
        return await LeadRepository.upsert(leadModel);
    }

    async updateLead(id, data) {
        const result = await LeadRepository.update(id, data);
        if (result.changes === 0) throw new Error("Lead não encontrado para atualizar");
        return { success: true, message: "Lead atualizado com sucesso" };
    }

    async deleteLead(id) {
        const result = await LeadRepository.delete(id);
        if (result.changes === 0) throw new Error("Lead não encontrado para deletar");
        return { success: true, message: "Lead removido com sucesso" };
    }
}

module.exports = new LeadService();