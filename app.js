//?IMPORTANDO EXPRESS E PATH PARA A "VARIAVEL" express, path
import express from 'express';
import path from 'path';
import { promises as fs } from "fs";
// import createError from 'http-errors'
import { PORT } from './config/config.js'
// import fs from 'fs';
import router  from "./routes/routes.js"

const {readFile, writeFile} = fs;
global.fileName = "grades.json"
const app = express();
app.use(express.json());

app.listen(process.env.PORT || PORT, async () => {
    try{
        console.log(`O server foi iniciado na porta ${PORT}`);
        await readFile(global.fileName);
    }catch(err){
        const initialJson = {
            nextId = 1,
            grades: []
        }
        writeFile(global.fileName, JSON.stringify(initialJson)).then(() => {
            logger.info("API Started and File Created!");
        }).catch(err => {
            logger.error(err);
        });
    }
})
app.use('/', router);