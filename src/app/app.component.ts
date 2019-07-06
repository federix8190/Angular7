import { Component, OnInit } from '@angular/core';
import { SidebarService } from './components/sidebar/sidebar.service';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI} from 'ng-block-ui';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @BlockUI('ui') blockUI: NgBlockUI;
  name: string;
  menu: Array<any> = [];
  breadcrumbList: Array<any> = [];
  title = 'sigecon-front';

  constructor(private _router: Router, public sidebarservice: SidebarService) { }

  ngOnInit(){
    this.menu = this.sidebarservice.getMenuList();
    this.listenRouting();
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

  listenRouting() {
    let routerUrl: string, routerList: Array<any>, target: any;
    this._router.events.subscribe((router: any) => {
      routerUrl = router.urlAfterRedirects;
      if (routerUrl && typeof routerUrl === 'string') {
        // breadcrumb
        target = this.menu;
        this.breadcrumbList.length = 0;
        // routing url components/crear-usuario, [0]=components, [1]=crear-usuario ...etc
        routerList = routerUrl.slice(1).split('/');
        routerList.forEach((router, index) => {
          // menu
          target = target.find(function(page){
            if (Number(router)) {
              if (page.route.slice(2).startsWith(':')) {
                return true;
              } else {
                return false;
              }
            } else {
              return page.route.slice(2) === router;
            }
          });
          // breadcrumbList
          if(target != undefined){
            this.breadcrumbList.push({
              title: target.title,
              route: (index === 0) ? target.route : `${this.breadcrumbList[index-1].route}/${target.route.slice(2)}`
            });

            if (index+1 !== routerList.length) {
              target = target.submenus;
            }
          }

        });

        //console.log(this.breadcrumbList);
      }
    });
  }


}
