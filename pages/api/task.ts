import type {NextApiRequest, NextApiResponse} from 'next';
import {DefaultResponseMsg} from '../../types/DefaultResponseMsg';
import connectDB from '../../middlewares/ConnectDB';
import jwtValidator from '../../middlewares/jwtValidator';
import { Task } from '../../types/Task';
import { TaskModel } from '../../models/TaskModel';
import { UserModel } from '../../models/UserModel';

const handler = async(req:NextApiRequest, res:NextApiResponse<DefaultResponseMsg>) =>{
    try{
        if(req.method === 'POST'){
            return await saveTask(req, res);
        }else if(req.method === 'GET'){
            return;
        }else if(req.method === 'PUT'){
            return;
        }else if(req.method === 'DELETE'){
            return;
        }

        res.status(400).json({ error: 'Metodo solicitado nao existe '});
    }catch(e){
        console.log('Ocorreu erro ao gerenciar tarefas: ', e);
        res.status(500).json({ error: 'Ocorreu erro ao gerenciar tarefas, tente novamente '});
    }
}

const saveTask = async(req:NextApiRequest, res:NextApiResponse<DefaultResponseMsg>) =>{
    if(req.body){
        const userId = req.body.userId;
        if(!userId){
            return res.status(400).json({ error: 'Usuario nao informado'});
        }

        const userFound = await UserModel.findById(userId);
        if(!userFound){
            return res.status(400).json({ error: 'Usuario nao encontrado'});
        }

        const task = req.body as Task;

        if(!task.name || task.name.length < 2){
            return res.status(400).json({ error: 'Nome da tarefa invalida'});
        }

        if(!task.finishPrevisionDate || new Date(task.finishPrevisionDate).getDate() < new Date().getDate()){
            return res.status(400).json({ error: 'Data de previsao invalida ou menor que hoje'});
        }

        const final = {
            ...task,
            userId,
            finishDate : undefined
        } as Task;

        await TaskModel.create(final);
        return res.status(200).json({ msg: 'Tarefa criada com sucesso'});
    }

    return res.status(400).json({ error: 'Parametros de entrada invalido'});
}

export default connectDB(jwtValidator(handler));