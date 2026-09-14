const express = require("express");

const mysql = require("mysql2");

const cors = require("cors");


const app = express();


app.use(cors());

app.use(express.json());


const banco = mysql.createPool({

    host: "banco",

    user: "root",

    password: "123456",

    database: "recados"

});


app.get("/recados", (req, res) => {

    banco.query(
        "SELECT * FROM recados",
        (erro, resultados) => {

            if (erro) {

                return res.status(500).json({
                    erro: "Erro ao buscar recados"
                });

            }

            res.json(resultados);

        }
    );

});


app.post("/recados", (req, res) => {

    const { texto } = req.body;


    banco.query(

        "INSERT INTO recados (texto) VALUES (?)",

        [texto],

        (erro) => {

            if (erro) {

                return res.status(500).json({
                    erro: "Erro ao salvar recado"
                });

            }

            res.json({
                mensagem: "Recado salvo"
            });

        }

    );

});


app.listen(3000, () => {

    console.log("Backend rodando na porta 3000");

});