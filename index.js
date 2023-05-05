import express, { request, response } from "express";
import session from "express-session";
import tasksrouter from "./routes/task.js";

const app = express();
const port = 3000;

const credentials = {
    email: "real@gmail.com",
    password: "m295"
}

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
// Bekamm für den unteren app.use Meldungen:
// "express-session deprecated undefined resave option; provide resave"
// "express-session deprecated undefined saveUninitialized option; provide saveUninitialized"
// "express-session deprecated undefined saveUninitialized option; provide saveUninitialized"
// "express-session deprecated req.secret option; provide secret"
// Mit dieser Website habe ich es gefixt: --> https://www.npmjs.com/package/express-session 
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "RilderRiggler",
    cookie: {} //<-- Zeile von den Unterichtsunterlagen 
}));

// Diese Funktion habe ich mit Ben (https://github.com/BWizard06) erstellt
function authenticate(request, response, next){
    request.session.email ? next() : response.status(403).json({error: "Nicht eingeloggt!"});
}

// https://help.xmatters.com/ondemand/trial/valid_email_format.htm#:~:text=A%20valid%20email%20address%20consists,com"%20is%20the%20email%20domain.
// Dieser Link habe ich benutzt, um zu definieren, was eine valide & invalide E-Mail ist


app.use('/tasks', authenticate, tasksrouter);

app.get('/*', (request, response) => {
    response.status(404);
})

app.post('/login', (request, response) =>{
    const {email, password} = request.body;
    if(password === credentials.password && email === credentials.email){
        request.session.email = email;
        return response.status(200).json({email: request.session.email});
    }
    return response.status(401).json({error: "Invalid Credentials"});
})
// Konnte nicht einloggen, da ich kein return-statement hatte --> antwort von 
// https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client#:~:text=The%20error%20"Error%3A%20Can%27,body%20has%20already%20been%20written.
// und von den Unterrichtsunterlagen geprüft

app.get('/verify', (request, response) => {
    if (request.session.email){
        return response.status(200).json({email: request.session.email})
    }
    return response.status(401).json({error: "Nicht eingeloggt!"})
})

// Ich hatte mühe, das logout umzusetzen
// bei der Suche nach einer Lösung habe ich
// https://www.tabnine.com/code/javascript/functions/express-session/Session/destroy
// gefunden & benutzt.
app.delete('/logout', (request, response) => {
    if (request.session.email){
        request.session.destroy();
        response.clearCookie();
        return response.status(204).json({message: "amk"});   
    }
    response.status(401)
})

app.listen(port, () => {
    console.log(`Läuft auf Port ${port}`);
})