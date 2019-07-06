import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import {LoginComponent} from '../../login/login.component';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {AuthenticationService} from '../../services/authentication.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers:[ AuthenticationService],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class HeaderComponent implements OnInit {
  menus = [];

  constructor(public sidebarservice: SidebarService,  public router: Router, private autenticacion: AuthenticationService) {
    this.menus = sidebarservice.getMenuList();
  }
  toggleSidebar() {

    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }
  toggleBackgroundImage() {
    this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  }
  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }

  ngOnInit() {
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

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
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

  logout(){

    this.autenticacion.logout().subscribe(resp =>{
      if (resp.error)
      {
        console.log("Ocurrio un error al hacer el logout")
      }
      else
      {
        localStorage.removeItem("autenticado");
        this.router.navigate(['login']);
      }
    })
  }

}
