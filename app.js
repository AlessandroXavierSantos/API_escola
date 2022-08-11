//?IMPORTANDO EXPRESS E PATH PARA A "VARIAVEL" express, path
import express from 'express';
import path from 'path';
import createError from 'http-errors'
import { PORT } from './config/config.js'
import fs from 'fs';

const {readFile, writeFile} = fs;
global.fileName = 'grades.json'
const app = express();
app.use(express.json());

app.use((req, res, next) => {
    next(createError(404));
    console.log(createError);
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`O server foi iniciado na porta ${PORT}`);
})

app.listen(3000, async () => {    
    try {
        await readFile(global.fileName);
    }
    catch (err) {
    }
});
