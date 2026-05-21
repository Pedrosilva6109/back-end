const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const LeadController = require('./src/controllers/leadController');

const app = express();
app.use(express.json());

// --- CONFIGURAÇÃO DO SWAGGER ---
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: { title: 'Lead Manager API (CRUD Completo)', version: '2.0.0' },
        paths: {
            '/leads': {
                get: { summary: 'Listar todos os Leads', responses: { '200': { description: 'OK' } } },
                post: { 
                    summary: 'Criar ou Atualizar Lead',
                    requestBody: { content: { 'application/json': { schema: { type: 'object', properties: { contato: {type:'string'}, nome: {type:'string'}, ultima_mensagem: {type:'string'}, ultima_resposta: {type:'string'} } } } } },
                    responses: { '201': { description: 'Criado com sucesso' }, '400': { description: 'Erro de validação' } }
                }
            },
            '/leads/{id}': {
                get: {
                    summary: 'Buscar um Lead pelo ID',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { '200': { description: 'OK' }, '404': { description: 'Não encontrado' } }
                },
                put: {
                    summary: 'Atualizar um Lead',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    requestBody: { content: { 'application/json': { schema: { type: 'object', properties: { nome: {type:'string'}, status: {type:'string'}, ultima_mensagem: {type:'string'} } } } } },
                    responses: { '200': { description: 'Atualizado com sucesso' }, '400': { description: 'Erro' } }
                },
                delete: {
                    summary: 'Deletar um Lead',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { '200': { description: 'Deletado com sucesso' }, '400': { description: 'Erro' } }
                }
            }
        }
    },
    apis: []
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)));

// --- ROTAS CRUD LIGADAS AO CONTROLLER ---
app.get('/leads', LeadController.index);
app.post('/leads', LeadController.store);
app.get('/leads/:id', LeadController.show);
app.put('/leads/:id', LeadController.update);
app.delete('/leads/:id', LeadController.destroy);

// Inicia o Servidor
app.listen(3000, () => console.log('🚀 Servidor rodando CRUD completo em http://localhost:3000/api-docs'));