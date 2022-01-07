const fileSystem = require('fs');
const path = require('path');

let ObtenerUsuarios  = () => {
    let usersData = fileSystem.readFileSync(path.join(__dirname, '/Usuarios.json'));
    let UsuariosArray = JSON.parse(usersData);
    return UsuariosArray;
}

module.exports.ObtenerUsuarios = ObtenerUsuarios;