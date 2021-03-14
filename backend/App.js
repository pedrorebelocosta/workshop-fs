// Importar as bibliotecas e controladores
const NoteController = require('./NoteController');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

// Inicializar as nossa aplicação express
const app = express();

app.use(cors());
app.use(express.json());

// Ligar o debug para verificar as nossas queries à base de dados
mongoose.set('debug', true);

// Opções mongoose para compatibilidade com o novo driver MongoDB
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

// Ligar efetivamente à base de dados MongoDB
mongoose.connect('mongodb+srv://workshop-fs:workshopmega@cluster0.p1g3m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
mongoose.Promise = global.Promise;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Configurar os nossos endpoints
app.get('/note', NoteController.readAll);
app.post('/note', NoteController.create);
app.put('/note/:id', NoteController.update);
app.delete('/note/:id', NoteController.delete);

app.listen(4000, () => {
	console.log("API is now listening to requests!");
});
