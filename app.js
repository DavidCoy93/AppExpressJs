const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');


let usersData = fs.readFileSync(path.join(__dirname, '/Usuarios.json'));
let ObjUsers = JSON.parse(usersData);
console.log(ObjUsers);

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/Index.html'));
});

router.get('/login', function(req, res){
    res.sendFile(path.join(__dirname + '/login.html'));
});

router.get('/personas', function(req, res){
    res.send(ObjUsers);
});

var jsonParser = bodyParser.json();

router.post('/iniciar', jsonParser, function(req, res){
    console.log(req.body);
    for (let i = 0; i < ObjUsers.Usuarios.length; i++) {
        if (ObjUsers.Usuarios[i].Nombre === req.body.User && ObjUsers.Usuarios[i].Password === req.body.Pass && ObjUsers.Usuarios[i].VaAPistearHoy === true) {
            console.log("Entre al if");
            var ObjPersonaCorrecto = {
                User: req.body.User,
                Pass: req.body.Pass,
                Existe: true
            };
            res.send(ObjPersonaCorrecto);
            console.log("Acceso correcto");
            break;
        } else {
            console.log("No entre al if");
            var ObjPersonaError = {
                User: null,
                Pass: null,
                Existe: false
            };
            res.send(ObjPersonaError);
            console.log("El usuario no existe");
        }
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