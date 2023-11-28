# obligatorioBD

INSTALACIÓN:
Es necesario instalar Node js. Lo pueden encontrar acá: https://nodejs.org/en/download https://nodejs.org/en/download/package-manager
También es necesario tener npm instalado. 

Correr los siguientes comandos en el orden establecido:
1) Para instalar angular ejecutar: npm install -g @angular/cli
2) Ir a /Angular/obligatorioBD y ejecutar: npm install
3) Ir a /API y ejecutar: npm install


LEVANTAR LA APP:
Para levantar la app ejecute los comandos en el siguiente orden, esperando a que termine el anterior antes de avanzar con el siguiente:
1) Ir a "/Base de datos" y ejecutar: docker-compose up
2) Ir a /API y ejecutar: npm run dev
3) Ir a /Angular/obligatorioBD y ejecutar: ng serve --open
4) Dirigirse a localhost:4200 en el navegador

CONSIDERACIONES ANTES DE USAR LA APP:
Hay un usuario administrador con usuario: admin y contraseña: admin
Existen 8 usuarios en la tabla "funcionariosUcu" que son los únicos que pueden registrarse al sistema a través de su CI. 
Estás son: 
  - 23456789
  - 34567891
  - 45678912
  - 56789123
  - 67891234
  - 78912345
  - 89123456
  - 91234567

Existe un procedimiento llamado "actualizar()" que actualiza la tabla "actualizar", que contiene las personas que no enviaron su carnet de salud.
Este procedimiento se ejecuta una vez cada 24 horas, por lo tanto, al usar la app la seccion de listado de personas va a aparecer desactualizado 
hasta el dia siguiente.
Para ver el listado actualizado basta llamar a este procedimiento en datagrip de la siguiente forma: "call actualizar()".

FUNCIONALIDADES
- AGENDA: permite al usuario agendarse.
- PERIODO: permite al administrador modificar el periodo de actualizacion.
- FORMULARIO: permite al usuario actualizar el formulario de carnet de salud.
- LISTAR: permite al administrador ver los funcionarios que no enviaron su formulario de carnet de salud todavía. En este sistema, no esta disponible la
  funcionalidad de enviar email cada 24H de forma automatica, por lo tanto, el administrador debe copiar todos los email a través del boton "copiar emails" y
  enviarlo de forma manual.
- REGISTRARSE: permite al usuario registrarse por primera vez (la CI debe estar en la tabla funcionariosUcu) a través del boton "Registrarse" en a pantalla de login.



