const LeadService = require('../services/leadService');

class LeadController {
    async index(_req, res) {
        try {
            const leads = await LeadService.getAllLeads();
            res.json(leads);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async show(req, res) {
        try {
            const lead = await LeadService.getLeadById(req.params.id);
            res.json(lead);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }

    async store(req, res) {
        try {
            const result = await LeadService.processLead(req.body);
            res.status(201).json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const result = await LeadService.updateLead(req.params.id, req.body);
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async destroy(req, res) {
        try {
            const result = await LeadService.deleteLead(req.params.id);
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

module.exports = new LeadController();