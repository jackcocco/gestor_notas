let opts_crear = {
    descripcion: {
        demand: true,
        alias: 'd'
    }
}

let opts_actualizar = {
    opts_crear,
    completado: {
        alias: 'c',
        default: true
    }
}

const argv = require('yargs')
    .command('crear', 'crear una nueva tarea por hacer', opts_crear)
    .command('listar', 'listar todas las tareas creadas')
    .command('actualizar', 'listo todas las tareas', opts_actualizar)
    .command('eliminar', 'elimina una tarea en base a una descrpcion', opts_crear)
    .help()
    .argv;

module.exports = {
    argv: argv
}