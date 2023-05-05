import express, { request, response } from "express";

const router = express.Router();

// Test-Daten
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

// Endpoint um alle Tasks anzuzeigen
router.get('/', (request, response) => {
    response.status(200).json({tasks});
});

// Endpoint um ein Tasks mittels Id zu suchen
router.get('/:id', (request, response) => {
    const id = request.params.id;
    let foundtask;
    for (let task of tasks){
        if (task.id == id){
            foundtask = task;
            break;
        }
    }
    foundtask ? response.status(200).json({foundtask}) : response.status(404).json({error: "Task existiert nicht"});
});

// Endpoint um eine neue Task zu erstellen & zu den anderen hinzufügen
router.post('/', (request, response) => {
    let newtask = {};
    for (const key in request.body){
        newtask[key] = request.body[key];
    }
    tasks.push(newtask);
    response.status(201).json({newtask});
});

// Endpoint um eine bestehende Task zu ändern
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
        response.status(201).json({updatedtask});
    }else{
        response.status(404).json({error: "Task nicht gefunden"})
    }
});

// Endpoint um eine Task zu löschen
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
        response.status(202).json({message: "Task gelöscht"})
    }else{
        response.status(404).json({error: "Task nicht gefunden"})
    }
});

export default router;