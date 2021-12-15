const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/Index.html'));
});

router.get('/login', function(req, res){
    res.sendFile(path.join(__dirname + '/login.html'));
});

router.get('/personas', function(req, res){
    var PersonaList = [
        {
            Nombre: "Robert",
            Apellido: "Garcia",
            Edad: 46
        },
        {
            Nombre: "Ramon",
            Apellido: "Ayala",
            Edad: 69
        },
    ];
    res.send(PersonaList);
});

var jsonParser = bodyParser.json();

router.post('/iniciar', jsonParser, function(req, res){
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    if (req.body.User === 'Mario' && req.body.Pass === 'abc123') {
        var ObjPersonaCorrecto = {
            User: req.body.User,
            Pass: req.body.Pass,
            Existe: true
        };
        res.send(ObjPersonaCorrecto);
        console.log("Acceso correcto");
    } else {
        var ObjPersonaError = {
            User: null,
            Pass: null,
            Existe: false
        };
        res.send(ObjPersonaError);
        console.log("El usuario no existe");
    }
});

app.use('/', router);

app.use(cors({
    origin: '*'
}));

app.use(express.static(__dirname + '/css'));

app.listen(1666, () => {
    console.log("El servidor se esta inicializando en el puerto 1666");
});