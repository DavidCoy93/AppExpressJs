const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const encriptador = require('./encriptador');
const usuario = require('./user');
const eventos = require('./eventos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', router);
app.use(cors({
    origin: '*',
    methods: ["GET", "POST", "DELETE", "PUT"]
}));

router.use(cors({
    origin: '*',
    methods: ["GET", "POST", "DELETE", "PUT"]
}));

app.use('/', express.static(__dirname));

app.listen(1666, () => {
    console.log("El servidor se esta inicializando en el puerto 1666");
});

let ArrayUsuarios = null;

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/Index.html'));
});

router.get('/login', function(req, res){
    res.sendFile(path.join(__dirname + '/login.html'));
});

router.get('/calendario', function(req, res){
    res.sendFile(path.join(__dirname + '/calendar.html'));
});

router.get('/pruebadiv', function(req, res){
    res.sendFile(path.join(__dirname + '/PruebaDivs.html'));
});

router.get('/personas', function(req, res){
    ArrayUsuarios = usuario.ObtenerUsuarios();
    res.send(ArrayUsuarios);
});

router.post('/iniciar', function(req, res){
    ArrayUsuarios = usuario.ObtenerUsuarios();
    console.log(req.body);
    let ObjPersona = {
        User: req.body.User,
        Pass: req.body.Pass,
        Existe: false
    };
    for (let i = 0; i < ArrayUsuarios.Usuarios.length; i++) {
        if (ArrayUsuarios.Usuarios[i].Nombre === req.body.User && ArrayUsuarios.Usuarios[i].Password === req.body.Pass && ArrayUsuarios.Usuarios[i].VaAPistearHoy === true) {
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

router.get('/encriptar/:Mensaje', function(req, res){
    let MensajeEncriptado = encriptador.MensajeEncriptado(req.params.Mensaje);
    res.send(MensajeEncriptado);
});

router.get('/desencriptar/:MensajeEncriptado', function(req, res){
    let MensajeDesencriptado = encriptador.MensajeDesencriptado(req.params.MensajeEncriptado);
    res.send(MensajeDesencriptado);
});

router.post('/agregarPersona', function(req, res){
    ArrayUsuarios = usuario.ObtenerUsuarios();
    ArrayUsuarios.Usuarios.push(req.body.Persona);
    console.log(ArrayUsuarios);
    fs.rmSync(path.join(__dirname, '/Usuarios.json'));
    console.log('Se elimino el archivo correctamente');
    let DataFile = JSON.stringify(ArrayUsuarios);
    fs.writeFileSync(path.join(__dirname, '/Usuarios.json'), DataFile);
    console.log('Se creo el archivo correctamente');
    res.send(true);
});

router.get('/eventos/:IdSala', function(req, res) {
    let Eventos = eventos.ObtenerEventos(parseInt(req.params.IdSala));
    res.status(200).send(Eventos);
});

