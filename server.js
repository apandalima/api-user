import express from 'express';

const app = express();
app.use(express.json());

const usuarios = [
  { cpf: 123, nome: 'Mingi', data_nascimento: '1999-08-18' },
  { cpf: 456, nome: 'Thyfanny', data_nascimento: '2003-01-28' }
];

// Rota POST para adicionar um usuário
app.post('/api/user', (req, res) => {  // Atualize a rota para '/api/user'
  const novoUsuario = req.body;

  if (usuarios.some(usuario => usuario.cpf === novoUsuario.cpf)) {
    return res.status(400).send('Usuário com este CPF já existe.');
  }

  usuarios.push(novoUsuario);
  res.status(201).send('Usuário cadastrado com sucesso.');
});

// Rota GET para listar todos os usuários
app.get('/api/users', (req, res) => {  // Atualize a rota para '/api/users'
  res.status(200).json(usuarios);
});

// Rota GET para buscar um usuário pelo CPF
app.get('/api/user/:cpf', (req, res) => {  // Atualize a rota para '/api/user/:cpf'
  const cpf = req.params.cpf;
  const usuario = usuarios.find(u => u.cpf == cpf);

  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).send('Usuário não encontrado.');
  }
});

// Rota DELETE para excluir um usuário por CPF
app.delete('/api/user/:cpf', (req, res) => {  // Atualize a rota para '/api/user/:cpf'
  const index = usuarios.findIndex(usuario => usuario.cpf == req.params.cpf);

  if (index !== -1) {
    usuarios.splice(index, 1);
    res.send('Usuário excluído com sucesso.');
  } else {
    res.status(404).send('Usuário não encontrado.');
  }
});

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
