# Primera entrega TDEA curso virtual Node JS

## Descripción

Con este trabajo se busca suplir las siguientes historias de usuario:

- Como interesado necesito obtener la información de cursos ofertados por educación continua para así tener diferentes opciones para elegir posteriormente un curso al cual matricularme
- Como interesado necesito seleccionar un curso para ingresar mis datos y quedar como prematriculado

## Como correr el programa

Primero ejecutar `npm install` para instalar las dependencias. Luego correr el programa con una de las siguientes dos formas:

Para listar todos los cursos:

~~~ bash
node index.js
~~~

Para realizar un proceso de inscripción

~~~ bash
node index.js inscribir --id=[id del curso] --nombre=[Nombre del interesado] --cedula=[Cedula del interesado]
~~~