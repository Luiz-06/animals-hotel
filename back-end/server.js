const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());
app.use(cors()); 

const SECRET_KEY = "segredo123"; 

const db = {
    tutores: [
        { id: "1", nome: "Ana Silva", email: "ana@teste.com", telefone: "9999-1111" }
    ],
    animais: [
        { id: "10", nome: "Rex", especie: "Cachorro", raca: "Vira-lata", idade: 3, tutorId: "1" }
    ]
};


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (token == null) return res.sendStatus(401); 

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403); 
        req.user = user;
        next(); 
    });
};

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (password === '123456') {
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token, user: { email, name: 'Admin' } });
    }
    return res.status(401).json({ message: 'Senha inválida (use 123456)' });
});

app.get('/tutores', (req, res) => res.json(db.tutores));

app.post('/tutores', authenticateToken, (req, res) => {
    const novoTutor = { id: uuidv4(), ...req.body };
    db.tutores.push(novoTutor);
    res.status(201).json(novoTutor);
});

app.put('/tutores/:id', authenticateToken, (req, res) => {
    const index = db.tutores.findIndex(t => t.id === req.params.id);
    if (index !== -1) {
        db.tutores[index] = { ...db.tutores[index], ...req.body };
        res.json(db.tutores[index]);
    } else {
        res.status(404).json({ message: "Tutor não encontrado" });
    }
});

app.delete('/tutores/:id', authenticateToken, (req, res) => {
    db.tutores = db.tutores.filter(t => t.id !== req.params.id);
    db.animais = db.animais.filter(a => a.tutorId !== req.params.id); // Cascata
    res.status(204).send();
});

app.get('/animais', (req, res) => {
    const { tutorId } = req.query;
    if (tutorId) {
        return res.json(db.animais.filter(a => a.tutorId === tutorId));
    }
    res.json(db.animais);
});

app.post('/animais', authenticateToken, (req, res) => {
    const novoAnimal = { id: uuidv4(), ...req.body };
    db.animais.push(novoAnimal);
    res.status(201).json(novoAnimal);
});

app.delete('/animais/:id', authenticateToken, (req, res) => {
    db.animais = db.animais.filter(a => a.id !== req.params.id);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('🔥 BACKEND RODANDO NA PORTA 3000');
    console.log('Login Senha: "123456"');
});