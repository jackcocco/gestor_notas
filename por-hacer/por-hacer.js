const fs = require('fs');
var colors = require('colors');

let listadoPorHacer = [];

const crear = (descripcion) => {

    cargarDB();
    let porHacer = {
        descripcion: descripcion,
        completado: false
    };
    //push:para agregar un elemento a un array
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const listar = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado) => {

    cargarDB();

    //findIndex: me devuelve la posicion del elemento en el array
    // -1 si no la encuentra
    let tareaDB = listadoPorHacer.find(
        tarea => (tarea.descripcion === descripcion)
    );

    if (tareaDB) {

        tareaDB.completado = completado;
        console.log(`tarea a actualizar ${tareaDB.descripcion} ${tareaDB.completado}`)
        guardarDB();
        return true

    } else {
        return false;
    }


}

const eliminar = (descripcion) => {

    cargarDB();

    let nuevoListado = listadoPorHacer.filter((tarea) => {
        return tarea.descripcion !== descripcion
    });

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        cargarDB();
        return true;
    }




}

const guardarDB = () => {
    //JSON.stringify: para comvertir cualquier objeto en un json
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) {
            throw new Error('No se pudo grabar', err);
        };
        console.log('The file has been saved!');
    });
}

const cargarDB = () => {
    //puedo hacer una peticion http para leer un archivo, en el caso del navegador
    //pero estoy del lado del servidor entonces hago un require del arhcivo
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

module.exports = {
    crear: crear,
    listar: listar,
    actualizar: actualizar,
    eliminar: eliminar
}