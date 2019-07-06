import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  _hasBackgroundImage = true;
  menus = [
    {
      title: 'Resumen',
      route: './home',
      submenus: []
    },
    {
      title: 'Convocatorias',
      icon: 'fas fa-folder',
      active: false,
      type: 'dropdown',
      route: './convocatorias',
      submenus: [
        {
          title: 'Concurso',
          route: './concursos',
          path: '/convocatorias/concursos',
          icon: 'fas fa-folder-open'
        },
        {
          title: 'Elegibles',
          route: './elegibles',
          path: '/convocatorias/elegibles',
          icon: 'fas fa-user-check'
        },
      ]
    },
    {
      title: 'Configuraciones',
      icon: 'fa fa-cog',
      active: false,
      type: 'dropdown',
      route: './configuraciones',
      submenus: [
       /* {
          title: 'Forms',
          route:'./forms',
          path: '/components/forms'
        },
        {
          title: 'Gráficos',
          route:'./grafico-test',
          path: '/components/grafico-test'
        },*/
        {
          title: 'Usuarios',
          route: './usuarios',
          path: '/configuraciones/usuarios',
          icon: 'fa fa-users'
          /*submenus:[
            {
              route: './:id'  ,
              path: '/components/crear-usuario/id',
            }
          ]*/
        },
        {
          title: 'Roles',
          route: './roles',
          path: '/configuraciones/roles',
          icon: 'fas fa-user-shield'
          /*submenus:[
            {
              route: './:id'  ,
              path: '/components/crear-usuario/id',
            }
          ]*/
        },
        /*{
          title: 'Crear Persona',
          route: './crear-persona',
          path: '/configuraciones/crear-persona'
        },*/
      ]
    },
    {
      title: 'Paramétricas',
      icon: 'fas fa-tools',
      active: false,
      type: 'dropdown',
      route: './parametricas',
      submenus: [
        {
          title: 'Tipos Concurso',
          route: './tipos-concurso',
          path: '/parametricas/tipos-concurso',
          icon: 'fas fa-award '
        },
        {
          title: 'Modalidades',
          route: './modalidades',
          path: '/parametricas/modalidades',
          icon: 'far fa-folder-open'
        },
      ]
    },


  ];
  constructor() { }

  toggle() {
    //console.log(this.toggled );
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}
