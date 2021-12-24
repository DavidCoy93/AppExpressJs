const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', router);
app.use(cors({
    origin: '*'
}));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname));
app.listen(1666, () => {
    console.log("El servidor se esta inicializando en el puerto 1666");
});

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

router.post('/iniciar', function(req, res){
    console.log(req.body);
    let ObjPersona = {
        User: req.body.User,
        Pass: req.body.Pass,
        Existe: false
    };
    for (let i = 0; i < ObjUsers.Usuarios.length; i++) {
        if (ObjUsers.Usuarios[i].Nombre === req.body.User && ObjUsers.Usuarios[i].Password === req.body.Pass && ObjUsers.Usuarios[i].VaAPistearHoy === true) {
            ObjPersona.Existe = true;
            break;
        } else {
            ObjPersona.Existe = false;
            console.log("iteracion No: " + i);
        }
    }
    if (ObjPersona.Existe === true) {
        console.log("Acceso correcto");
    } else {
        console.log("El usuario no existe");
    }
    res.send(ObjPersona);
});

