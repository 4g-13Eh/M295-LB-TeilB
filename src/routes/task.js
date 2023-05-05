import express, { request, response } from "express";

const router = express.Router();

// Test-Daten
// wurden von ChatGPT erstellt
const tasks = [
    {
      id: 1,
      titel: "Einkaufen",
      erstelldatum: "2023-05-01",
      erfüllungsdatum: "2023-05-02"
    },
    {
      id: 2,
      titel: "Hausarbeit erledigen",
      erstelldatum: "2023-05-03",
      erfüllungsdatum: "2023-05-04"
    },
    {
      id: 3,
      titel: "Sport treiben",
      erstelldatum: "2023-05-02",
      erfüllungsdatum: "2023-05-03"
    },
    {
      id: 4,
      titel: "Mittagessen machen",
      erstelldatum: "2023-05-04",
      erfüllungsdatum: "2023-05-05"
    },
    {
      id: 5,
      titel: "Wäsche waschen",
      erstelldatum: "2023-05-01",
      erfüllungsdatum: "2023-05-02"
    },
    {
      id: 6,
      titel: "Lernen für Prüfung",
      erstelldatum: "2023-05-02",
      erfüllungsdatum: "2023-05-04"
    },
    {
      id: 7,
      titel: "Buch lesen",
      erstelldatum: "2023-05-04",
      erfüllungsdatum: "2023-05-06"
    },
    {
      id: 8,
      titel: "Termin beim Arzt",
      erstelldatum: "2023-05-05",
      erfüllungsdatum: "2023-05-05"
    },
    {
      id: 9,
      titel: "Geschenk für Freund kaufen",
      erstelldatum: "2023-05-03",
      erfüllungsdatum: "2023-05-04"
    },
    {
      id: 10,
      titel: "Spazieren gehen",
      erstelldatum: "2023-05-01",
      erfüllungsdatum: "2023-05-02"
    }
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
    foundtask ? response.status(200).json({foundtask}) : response.status(404).json({error: "Nicht Gefunden"});
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
// Endpoint wurde mithilfe den eigenen Unterlagen umgesetzt
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
// Endpoint wurde mithilfe den eigenen Unterlagen umgesetzt
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
        response.status(202).json({foundtask})
    }else{
        response.status(404).json({error: "Task nicht gefunden"})    
    }
});

export default router;