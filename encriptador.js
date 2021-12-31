const crypto = require('crypto');

const algorithm = 'aes-256-cbc';

const SecretKey = 'LeonNegroTigreOzesnoPayaso731666';

const iv = crypto.randomBytes(16);

exports.MensajeEncriptado = (mensaje) => {
    let encriptador = crypto.createCipheriv(algorithm, SecretKey, iv);
    let encryptedMessage = encriptador.update(mensaje, 'utf-8', 'hex');
    encryptedMessage += encriptador.final('hex');
    return encryptedMessage;
}

exports.MensajeDesencriptado = (mensajeEncriptado) => {
    let desencriptador = crypto.createDecipheriv(algorithm, SecretKey, iv);
    let decryptedMessage = desencriptador.update(mensajeEncriptado, 'hex', 'utf-8');
    decryptedMessage += desencriptador.final('utf8');
    return decryptedMessage;
}