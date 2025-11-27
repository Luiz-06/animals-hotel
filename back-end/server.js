// server.js - Backend para AnimalHotels
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());
app.use(cors()); // Permite o Front-end acessar

const SECRET_KEY = "segredo123"; // Chave para o JWT

// --- BANCO DE DADOS EM MEMÓRIA (Reseta se fechar o terminal) ---
// Para persistir, usaríamos banco de dados ou arquivo, mas isso serve para o teste.
const db = {
    tutores: [
        { id: "1", nome: "Ana Silva", email: "ana@teste.com", telefone: "9999-1111" }
    ],
    animais: [
        { id: "10", nome: "Rex", especie: "cachorro", raca: "Vira-lata", idade: 3, tutorId: "1" }
    ]
};

// --- ROTA DE LOGIN (JWT) ---
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Simula login: Aceita qualquer email com senha "123456"
    if (password === '123456') {
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token, user: { email, name: 'Admin' } });
    }
    return res.status(401).json({ message: 'Senha inválida (use 123456)' });
});

// --- ROTAS DE TUTORES ---
app.get('/tutores', (req, res) => res.json(db.tutores));

app.post('/tutores', (req, res) => {
    const novoTutor = { id: uuidv4(), ...req.body };
    db.tutores.push(novoTutor);
    res.status(201).json(novoTutor);
});

app.delete('/tutores/:id', (req, res) => {
    db.tutores = db.tutores.filter(t => t.id !== req.params.id);
    db.animais = db.animais.filter(a => a.tutorId !== req.params.id); // Remove animais do tutor
    res.status(204).send();
});

// --- ROTAS DE ANIMAIS ---
app.get('/animais', (req, res) => {
    const { tutorId } = req.query;
    if (tutorId) {
        return res.json(db.animais.filter(a => a.tutorId === tutorId));
    }
    res.json(db.animais);
});

app.post('/animais', (req, res) => {
    const novoAnimal = { id: uuidv4(), ...req.body };
    db.animais.push(novoAnimal);
    res.status(201).json(novoAnimal);
});

app.delete('/animais/:id', (req, res) => {
    db.animais = db.animais.filter(a => a.id !== req.params.id);
    res.status(204).send();
});

// --- INICIAR ---
app.listen(3000, () => {
    console.log('🔥 BACKEND RODANDO NA PORTA 3000');
    console.log('Login Senha: "123456"');
});