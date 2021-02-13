require('colors');

let inquirer = require('inquirer');

const mostrarMenu = () => {
    //esto es para que salga el menu de forma infinita, no es todo, es una parte, añadimos el resolve
    return new Promise(resolve => {

        console.clear();

        console.log('============================'.red);
        console.log('Seleccione una Opción'.yellow);
        console.log('============================'.red);

        console.log(`${'1.'.yellow} Crear tarea`);
        console.log(`${'2.'.yellow} Ver tareas`);
        console.log(`${'3.'.yellow} Ver tareas completadas`);
        console.log(`${'4.'.yellow} Ver tareas pendientes`);
        console.log(`${'5.'.yellow} Completar tarea`);
        console.log(`${'6.'.yellow} Borrar tarea`);
        console.log(`${'0.'.yellow} Salir \n`);

        //recibir info del usuario

        const readLine = require('readline').createInterface({
            //el readline de c#  input es lo que vamos a recibir
            input: process.stdin,
            output: process.stdout
        });
        //funcion question() muestra el stdout. Funciona con un callback que llamaremos opt (opcion)
        readLine.question('Seleccione una opción: '.rainbow, (opt) => {

            //console.log(opt);
            readLine.close();
            resolve(opt);
        })

    });

}

const pausa = () => {

    return new Promise(resolve => {


        const readLine = require('readline').createInterface({
            //el readline de c#  input es lo que vamos a recibir
            input: process.stdin,
            output: process.stdout
        });
        //funcion question() muestra el stdout. Funciona con un callback que llamaremos opt (opcion)
        readLine.question(`\n Presione ${'ENTER'.yellow} para continuar.  `, (opt) => {
            readLine.close();
            resolve(opt);
        })

    });



}

//exportamos la funcion mostrarMenu
module.exports = {

    mostrarMenu,
    pausa
}