const fileSystem = require('fs');
const path = require('path');

let ObtenerEventos = (IdSala) => {
    let eventList;
    let readData = fileSystem.readFileSync(path.join(__dirname, '/Eventos.json'));
    let arrayFromFile = JSON.parse(readData);
    eventList = arrayFromFile.filter(evento => evento.extendedProps.sala === IdSala);
    return eventList;
}

module.exports.ObtenerEventos = ObtenerEventos;
