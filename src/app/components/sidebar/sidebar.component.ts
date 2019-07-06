import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from './sidebar.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  menus = [];
  constructor(public sidebarservice: SidebarService) {
    this.menus = sidebarservice.getMenuList();
   }

  ngOnInit() {
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggle(currentMenu) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }
  hasToggled(){
    //console.log($( "#mydiv" ).hasClass( "toggled" ));
    return !$( "#mydiv" ).hasClass( "toggled" );

  }
  getState(currentMenu) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }
  isAutenticado()
  {
    var auth=localStorage.getItem("autenticado");
    if (auth !=null && auth=="true" )
    {
      return true;
    }
    else
    {
      return false;
    }

  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }

}
