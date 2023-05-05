import express, { request, response } from "express";
import tasksrouter from "./routes/task.js";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use('/tasks', tasksrouter);

app.listen(port, () => {
    console.log(`Läuft auf Port ${port}`);
})