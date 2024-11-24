// Importa o framework Express.js para criar a aplicação web.
import express from "express";

// Importa o módulo Multer para lidar com o upload de arquivos.
import multer from "multer";

// Importa as funções para listar posts, postar novos posts e fazer upload de imagens do arquivo postsController.js.
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200 
}
// Configura o armazenamento de arquivos utilizando o Multer.
const storage = multer.diskStorage({
    // Define o diretório de destino para os arquivos upados.
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    // Define o nome do arquivo, mantendo o nome original.
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Cria uma instância do Multer com as configurações de armazenamento.
const upload = multer({ dest: "./uploads" , storage});

// Função que define as rotas da aplicação.
const routes = (app) => {
    // Habilita o middleware para analisar o corpo das requisições JSON. 
    app.use(express.json());
    app.use(cors(corsOptions));
    // Define uma rota GET para listar todos os posts.
    app.get("/posts", listarPosts);
    // Define uma rota POST para criar um novo post.
    app.post("/posts", postarNovoPost);
    // Define uma rota POST para fazer upload de uma imagem.
    app.post("/upload", upload.single("imagem"), uploadImagem);
    app.put("/upload/:id", atualizarNovoPost);
};

// Exporta a função routes para ser utilizada em outros módulos.
export default routes;