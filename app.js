const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

//conexao com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Senha@123',
    database: 'corpflow_db'
});

db.connect(err =>{
    if(err) throw err;
    console.log('Conectado ao banco de dados MYSQL.')
});


//adicionando tarefa
app.post("/tarefas", (req, res) =>{
    const { tarefa, descricao, prazo } = req.body;

    const query = "INSERT INTO tarefas (tarefa, descricao, prazo) VALUES (?, ?, ?)";
    db.query(query, [tarefa, descricao, prazo], (err, result) =>{
        if(err){
            res.status(500).send('Erro ao inserir tarefa.');
        } else{
            res.status(200).send('Tarefa adicionada com sucesso!');
        }
    });
});

app.listen(3000, () =>{
    console.log(`Servidor rodando  em http://localhost:3000`)
});






    


   



