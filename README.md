# Template Front Angular 7+
Proyecto desarrollado en Angular 7+ para ser utilizado como template front para Konecta.

## Construcción

### Instalar las dependencias
Primero se debe descargar el instalador de nodejs desde su [página oficial](http://nodejs.org/download/).
Luego debe ejecutar el siguiente comando para descargar las dependencias del proyecto.

```sh
$ npm install
```

Este proyecto utiliza SASS para compilar los scss a css, por lo tanto hay que instalar el compilador que se encuentra desarrollado en ruby con los siguientes comandos:

```
$ sudo apt-get install ruby
$ sudo apt-get install rubygems
$ sudo gem install sass
```

### Instalar Angular CLI
Se debe descargar la ultima versión del CLI de Angular.

```sh
$ npm install -g @angular/cli
```


### Levantar el proyecto
Por defecto el proyecto se levantará en `http://localhost:4200/`. 

```sh
$ ng serve --open
```

### Code scaffolding
Para generar los distintos tipos de componentes. Se pueden crear de los siguientes componentes 
a través del CLI `ng generate component|directive|pipe|service|class|guard|interface|enum|module`

```sh
$ ng generate component component-name
```
