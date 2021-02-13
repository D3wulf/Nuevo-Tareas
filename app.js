require('colors');

let inquirer = require('inquirer');

//importamos los paquetes nuestros para usarlos en el main
//const { mostrarMenu, pausa } = require('./helpers/mensajes');

//importamos el nuevo menu de inquirer
const { inMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
//const Tarea = require('./models/tarea')

const Tareas = require('./models/tareas');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');

//crearemos una constante main que sera asincrona y que es donde trabajaremos

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) { // cargar tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        // Imprimir el menú 
        opt = await inMenu();

        switch (opt) {
            case '1':
                // crear opcion
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
                break;

            case '2':
                tareas.listadoCompleto();
                break;

            case '3': // listar completadas
                tareas.listarPendientesCompletadas(true);
                break;

            case '4': // listar pendientes
                tareas.listarPendientesCompletadas(false);
                break;

            case '5': // completado | pendiente
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);

                break;

            case '6': // Borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('¿Está seguro?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
                break;

        }


        guardarDB(tareas.listadoArr);

        await pausa();

    } while (opt !== '0');


    // pausa();

}


main();