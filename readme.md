### Webpack Base
Esta es una plantilla para crear proyectos de Front-end con Webpack


### Pre-requisitos 📋
_Para poder usar este template hay que instalar Node.js y Npm_


## Empezar a trabajar 🍴
_Hay que realizar un fork del repositorio release desde Bitbucket_

_Después hay que clonar el repositorio manualmente o usando la herramienta de Bitbucket_
```
git clone {repository name}
```

## Instalación 🔧
_Hay que agregar las dependencias necesarias para correr el proyecto usando:_
```
npm install
```

## Usando Git Flow 🛠️
_Después de agregar las dependencias, iniciamos el flujo de trabajo con Git_
```
git flow init
```
* Este comando nos va crear una rama más (develop)

_Para agregar un nuevo feature(rama)_
```
git flow feature start name_feature
```
* Hay que trabajar siempre en el feature(rama) y no en las ramas master y develop


## Correr el proyecto 🚀
_Hay que iniciar el servidor de desarrollo, se abre por default en el puerto 8080_
```
npm run server
```


## Terminando features y solicitando PR 🔩
_Cuando se termina el feature, subimos los cambios a nuestro repositorio con push_
```
git add .
git commit -m "New feature added"
git push --set-upstream origin name_feature
```
* El push es para el repositorio de desarollo

_Después mandamos un pull request al respositorio release para revisión_

_Cuando nuestro pull request haya sido aprobado ya podemos cerrar nuestro feature con:_
```
git flow feature finish name_feature
```


## Obteniendo los últimos cambios del proyecto release ⚙️
_Agregamos el repositorio release y obtenemos los cambios con pull_

_Es importante revisar que ya tengamos cerrado nuestro feature y que estemos en la rama develop_
```
git branch
git remote add release repository_name
git pull release develop
```
* Hay que arreglar los conflictos en caso de ser necesario.


## Preparar para producción 📦
_Hay que ejecutar el siguiente comando, para tener los archivos minificados:_

```
npm run build:prod
```