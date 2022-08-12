import express from "express";
import { promises as fs } from "fs";

const {readFile, writeFile} = fs;
const router =  express.Router();

//?CADASTRO DE ALUNOS
router.post("/", async (req, res, next) => {
    try {
        let aluno = req.body;

        if (!aluno.name || aluno.subject || aluno.type || aluno.value == null) {
            throw new Error("Algumas informações que são obrigatórias estão faltando, tente novamente por gentileza.");
        }

        const data = JSON.parse(await readFile(global.fileName));

        var grade = { 
            id: data.nextId++,
            student: aluno.student,
            subject: aluno.subject,
            type: aluno.type,
            value: aluno.value
        };
        data.grades.push(grade);

        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(grade);

        logger.info(`POST /alunos - ${JSON.stringify(grade)}`);
    } catch (err) {        
        next(err);
    }
});

router.get('/', async (req, res ,next)=>{
    try{
        const data = JSON.parse(await readFile(global.fileName));
        res.send(data);
        logger.info("GET/ alunos");
    } catch(err){
        next(err);
    }
});

router.get('/:id', async (req, res, next)=> {
    try{
        const data = JSON.parse(await readFile(global.fileName));
        const alunos = data.alunos.find(
            alunos => alunos.id === parseInt(req.params.id));
        res.send(alunos)
        // logger.info("GET /students/:id")
    }catch(err){
        next(err)
    }
});


export default router;