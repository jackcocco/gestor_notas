const argv = require('./config/yargs').argv;
const color = require('colors');
const porHacer = require('./por-hacer/por-hacer');

//console.log(argv);

let commando = argv._[0];

switch (commando) {
    case 'crear':
        console.log('Crear por hacer'.yellow);
        let tarea = porHacer.crear(argv.descripcion);
        break;

    case 'listar':
        let listado = porHacer.listar();

        console.log('========Por Hacer========'.red);

        for (let tarea of listado) {

            console.log(tarea.descripcion.blue);
            console.log('Estado:', tarea.completado);

        }

        console.log("=========================");

        break;

    case 'actualizar':
        let resultado = porHacer.actualizar(argv.descripcion, argv.completado);
        if (!resultado) {
            console.log(`no se puedo actualizar con exito`.red)
        } else {
            console.log(`actualizado con exito`.blue)
        }
        break;

    case 'eliminar':
        let resultadoEliminar = porHacer.eliminar(argv.descripcion);
        if (!resultadoEliminar) {
            console.log(`no se pudo eliminar con exito`.red)
        } else {
            console.log(`eliminado con exito`.blue)
        }
        break;

    default:
        console.log('Comando no reconocido');

}