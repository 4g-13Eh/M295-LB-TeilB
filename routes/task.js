import express, { request, response } from "express";

const router = express.Router();

// List of tasks to test endpoints
const tasks = [
    {
        id: 1,
        title: "Learn Node.js",
    },
    {
        id: 2,
        title: "Learn React.js",
    },
    {
        id: 3,
        title: "Learn Next.js",
    },
];

// Endpoint to get all tasks
router.get('/', (request, response) => {
    response.status(200).send(tasks);
});

// Endpoint to search a task with an id
router.get('/:id', (request, response) => {
    const id = request.params.id;
    let foundtask;
    for (let task of tasks){
        if (task.id == id){
            foundtask = task;
            break;
        }
    }
    foundtask ? response.status(200).send(foundtask) : response.status(404).send("Task existiert nicht");
});

// Endpoint to create a new task and add it in task-list
router.post('/', (request, response) => {
    let newtask = {};
    for (const key in request.body){
        newtask[key] = request.body[key];
    }
    tasks.push(newtask);
    response.status(201).send(newtask);
});

// Endpoint to change a task with an id
router.put('/:id', (request, response) => {
    const id = request.params.id;
    let foundtask;
    let updatedtask;
    for (let task of tasks){
        if (task.id === Number(id)){
            foundtask = task;
            break;
        } 
    }
    if (foundtask){
        updatedtask = foundtask;
        for (const key in request.body){
            updatedtask[key] = request.body[key];
        }
        response.status(201).send(updatedtask);
    }else{
        response.status(404).send("Task nicht gefunden")
    }
});

// Endpoint to delete a task
router.delete('/:id', (request, response) => {
    const id = request.params.id;
    let foundtask;
    for (let task of tasks){
        if (task.id === Number(id)){
            foundtask = task;
            break;
        }
    }
    if (foundtask){
        const index = tasks.indexOf(foundtask);
        tasks.splice(index, 1);
        response.status(204).send("Task gelöscht")
    }else{
        response.status(404).send("task nicht gefunden")
    }
});

export default router;