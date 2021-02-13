 const { v4: uudiv4 } = require('uuid');

 class Tarea {

     id = '';
     desc = '';
     completadoEn = null;

     //esto es lo que se va a ejecutar cuando creemos una instancia de tarea

     constructor(desc) {

         this.id = uudiv4();
         this.desc = desc;
         this.completadoEn = null;

     }

 }


 module.exports = Tarea;