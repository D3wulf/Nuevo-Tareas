const inquirer = require('inquirer');

require('colors');

const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: "Sabemos que eres un vicioso",
    choices: [{
        value: '1',
        name: `1.`.yellow + ` Crear tarea`
    }, {
        value: '2',
        name: `2.`.yellow + ' Ver tareas'
    }, {
        value: '3',
        name: `3.`.yellow + ' Ver tareas completadas'
    }, {
        value: '4',
        name: `4.`.yellow + ' Ver tareas pendientes'
    }, {
        value: '5',
        name: `5.`.yellow + ' Completar tarea'
    }, {
        value: '6',
        name: `6.`.yellow + ' Borrar tarea'
    }, {
        value: '0',
        name: `0.`.yellow + ' Salir'
    }]
}];

const inMenu = async() => {

    console.clear();

    console.log('============================'.red);
    console.log('Seleccione una Opción'.yellow);
    console.log('============================'.red);
    // el propt de inquirer quiere unas preguntas.(questions)
    //creamos la constante opt para exportarla a la app aunque la destructuramos porque solo nos interesa el name de preguntas
    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;



}

// como hacer la pausa con el inquirer
const pausa = async() => {

    //creamos la pregunta para el prompt()
    const pregunta2 = [{
        type: 'input',
        name: 'enter',
        message: `\n Presione ${'ENTER'.yellow} para continuar.  `


    }];

    //enviamos la pregunta (question) al prompt()
    console.log('\n');
    await inquirer.prompt(pregunta2);



}


const leerInput = async(message) => {


    const question = [{
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {

                    return 'Escriba un número'.rainbow;
                }
                return true;

            }
        }

    ];
    const { desc } = await inquirer.prompt(question);
    return desc;


}
const listadoTareasBorrar = async(tareas = []) => {
    //con el map te salen todas las tareas que estan en un array metidas ya
    //es parecido a un foreach
    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}.`.yellow;

        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`
        }
    });
    //funcion de javascript unshift
    choices.unshift({
        value: '0',
        name: '0.'.yellow + ' Cancelar'
    });

    const preguntas = [{
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }]
        //aqui estará la seleccion de lo que se quiere hacer al darle a borrar
        //lo que demos ira a buscar la id y borrara esa tarea
    const { id } = await inquirer.prompt(preguntas);
    return id;
}
const confirmar = async(message) => {

    const question = [{
        //el confirn sale en la docu de inquirer
        type: 'confirm',
        name: 'ok',
        message
    }];

    const { ok } = await inquirer.prompt(question);
    return ok;
}
const mostrarListadoChecklist = async(tareas = []) => {


    //recorremos otra vez todas las tareas en modo listado
    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    //la pregunta que ira en el prompt
    const pregunta = [{

        //de inquirer de la parte types
        type: 'checkbox',
        name: 'ids',
        message: 'Selecciones',
        choices
    }]

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}


module.exports = {
    inMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}