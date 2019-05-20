const {cursos} = require('./listadoCursos');
var numeral = require('numeral');
var fs = require('fs');
var yargs = require('yargs');

const opciones = {
    'id':{
        alias:'i',
        describe:'Id del curso a inscribir',
        demand: true
    },
    'nombre':{
        alias:'n',
        describe:'Nombre del interesado',
        demand: true
    },
    'cedula':{
        alias:'c',
        describe:'Cedula del interesado',
        demand: true
    }
}

const argv = yargs.command('inscribir', 'Realizar inscripcion a un curso', opciones).argv

if(argv._.find(comando => comando == 'inscribir')){
    let nombre = argv.nombre;
    let cedula = argv.cedula;
    let id = argv.id;
    realizarInscripcion(id, nombre, cedula);
}else{
    imprimirCursos(cursos);
}

function imprimirCurso(curso){
    console.log('-------------------------------------------');
    console.log(`Nombre: ${curso.nombre}`);
    console.log(`Id: ${curso.id}`);
    console.log(`Duracion: ${curso.duracion} dias`);
    console.log(`Valor: ${numeral(curso.valor).format('$0,0.00')}`);
    console.log('-------------------------------------------');
}

function imprimirCursos(arregloCursos){
    let intervalo = 0;
    arregloCursos.forEach(curso => {
        setTimeout(function(){
            imprimirCurso(curso);
        }, intervalo);
        intervalo += 2000;
    });
}

function realizarInscripcion(id, nombre, cedula){
    console.log();
    let curso = cursos.find(curso => curso.id == id);
        
    if(curso == null){
        console.log('El curso especificado no existe');
        return;
    }

    imprimirCurso(curso);

    let interesado = {
        nombre: nombre,
        cedula: cedula
    };

    guardarArchivo(curso, interesado);
}

function guardarArchivo(curso, interesado){
    let data = 'Constancia de inscripcion\n';
    data += '\n';
    data += 'Interesado:\n';
    data += '-----------------------\n'
    data += `Nombre: ${interesado.nombre}\n`;
    data += `Cedula: ${interesado.cedula}\n`;
    data += '\n';
    data += 'Detalles del curso:\n';
    data += '-----------------------\n'
    data += `Nombre: ${curso.nombre}\n`;
    data += `Id: ${curso.id}\n`;
    data += `Duracion: ${curso.duracion}\n`;
    data += `Valor: ${numeral(curso.valor).format('$0,0.00')}\n`;

    let nombreArchivo = `${interesado.nombre} ${curso.nombre}.txt`;
    fs.writeFile(nombreArchivo, data, (err)=>{
        if(err){
            console.log('Ha ocurrido un error al escribir el archivo');
            console.log(err);
        }else{
            console.log(`Se ha guardado su comprobante en el archivo "${nombreArchivo}"`);
        }
    })
}