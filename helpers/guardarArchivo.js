//filesystem para guardar archivos
const fs = require('fs');
//ruta de guardado
const archivo = './db/data.json';
// la variable que lo va a guardar
const guardarDB = (data) => {
    //ruta + datos
    fs.writeFileSync(archivo, JSON.stringify(data));
}


const leerDB = () => {
    // para ver si el archivo existe o no
    if (!fs.existsSync(archivo)) {
        return null;
    }
    //readFileSync(Path, encoding)
    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
    //para que se vea como un array y no como un string
    const data = JSON.parse(info);

    // console.log(data);

    return data;
}



module.exports = {
    guardarDB,
    leerDB
}