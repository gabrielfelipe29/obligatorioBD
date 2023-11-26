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

ANTES DE USAR LA APP:
Hay un usuario administrador con usuario: admin y contraseña: admin
Existen 9 usuarios en la tabla "funcionariosUcu" que son los únicos que pueden registrarse al sistema a través de su CI. 
Estás son: 
1) 56789123
2) 23456789
3) 34567891
4) 45678912
5) 56789123
6) 67891234
7) 78912345
8) 89123456
9) 91234567
