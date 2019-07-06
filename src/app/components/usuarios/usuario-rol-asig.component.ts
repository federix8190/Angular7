import { Component, OnInit } from '@angular/core';
import {RolService} from '../../services/rol.service';
import {deleteEmptyData} from '../../commons/app-utils';
import { SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {Rol} from '../../models/rol';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {ActivatedRoute, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {RolTmp} from '../../models/rol-tmp';
import {AuthenticationService} from '../../services/authentication.service';
@Component({
  selector: 'app-rol-usuario-asig',
  templateUrl: './usuario-rol-asig.component.html',
  styleUrls: ['./usuario-rol-asig.component.scss'],
  providers:[SlimLoadingBarService]
})
export class UsuarioRolAsigComponent implements OnInit {
  listRoles: any = [];
  rolesAsig: any =[];
  total=0;
  rolesEnable: any =[];
  params:any;
  filter:any={};
  id:string='';
  @BlockUI() blockUI: NgBlockUI;
  constructor(private rolService: RolService, private slimLoadingBarService: SlimLoadingBarService, private router: Router,
              private route: ActivatedRoute,
              private toast: ToastrService)
  {}
  ngOnInit(): void {
    /**obtener todos los roles**/
    this.id = this.route.snapshot.paramMap.get('username');
    this.listarRoles();
    this.listarRolesAsig();
  }
  listarRoles()
  {

    this.slimLoadingBarService.start(() => {
      console.log('Loading complete');
    });
    let filter={};
    this.rolService.getRoles({
      count: 50,
      page: 1 ,
      pagination: false,
      orderBy: 'id',
      orderDir: 'ASC',
      filters: JSON.stringify(deleteEmptyData(filter))
    })
      .subscribe(
        rs => {
          this.listRoles = [];
          rs.dato.rows.forEach(a => {
            this.listRoles.push(new Rol(a));
          });
          this.rolService.getRolesAsig(this.id)
            .subscribe(
              rs => {
                this.rolesAsig = [];
                rs.dato.forEach(a => {
                  this.rolesAsig.push(new Rol(a));
                });
                this.slimLoadingBarService.complete();
              },
              er => { },
              () => {
                this.obtenerRolesDisponibles(this.listRoles, this.rolesAsig);
              }
            );

          this.slimLoadingBarService.complete();
        },
        er => { },
        () => { }
      );
  }
  listarRolesAsig()
  {
    this.slimLoadingBarService.start(() => {
      console.log('Loading complete');
    });

  }
  //Mueve todos los permisos a la derecha
  moveAll() {
    for (var i=0; i< this.rolesEnable.length;i++)
    {
      this.rolesAsig.push(this.rolesEnable[i]);
    }
    this.rolesEnable = [];

  }
  /**funcion que elimina los que ya estan asignados y dejar sin asignar**/
  obtenerRolesDisponibles(todos:any, seleccionados:any)
  {
    console.log("Valores listado");
    console.log(todos);
    console.log(seleccionados)
    this.rolesEnable=[];
    this.rolesEnable=todos;
    console.log(this.rolesEnable)
    for (var i=0; i<this.rolesEnable.length;i++)
    {
      for (var j=0; j<seleccionados.length;j++)
      {
        if (this.rolesEnable[i].id == seleccionados[j].id)
        {
          this.rolesEnable.splice(i,1);
        }
      }
    }
  }
  removeAll()
  {
    this.rolesAsig = [];
    this.rolesEnable = [];
    this.rolesEnable = this.listRoles;
  }



  moveSelected() {
   /* const selected = $('#from option:selected')[0].value;*/
    const selected = $('#from option:selected').val();
    for (var i=0; i< this.rolesEnable.length;i++)
    {
      if (selected == this.rolesEnable[i].id)
      {
        this.rolesAsig.push(this.rolesEnable[i]);
        this.rolesEnable.splice(i,1);
        break;
      }
    }

  }


  removeSelected() {
    const selected = $('#to option:selected').val();
    for (var i=0; i< this.rolesAsig.length;i++)
    {
      if (selected == this.rolesAsig[i].id)
      {
        this.rolesEnable.push(this.rolesAsig[i])
        this.rolesAsig.splice(i,1);
        break;
      }
    }
  }
  /*filtrarRolesDisponibles(){

    var value = this.filter.rolesDisp.toLowerCase();
    $("#from option").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });


  }

  filtrarRolesActuales(){

    var value = this.filter.rolesAct.toLowerCase();
    $("#to option").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });

  }*/

  asignarRoles()
  {
    this.blockUI.start('');
    let roles=[];
    for (var i=0; i<this.rolesAsig.length; i++)
    {
      roles.push(this.rolesAsig[i].id);
    }
    this.rolService.guardarRolesUsuarios(this.id, roles).subscribe(resp=>{
      this.blockUI.stop();
      if (!resp.error)
      {
        this.toast.success("Roles asignado con exito", "Roles");
        this.router.navigate(['configuraciones/usuarios']);
      }
      else
      {
        this.toast.error(resp.mensaje, "Roles");
      }
    });
  }


  asignarPermisos() {
    this.blockUI.start('');
    /*let data = {
      id: this.listarRoles().id,
      permisos: this.permsSelec
    };*/

    /*this.rolService.asignarPermisoRol(data).subscribe((response) => {
      this.blockUI.stop();
      this.toast.customSucess("Se asignaron correctamente los Roles");
      var url = "/configuraciones/roles";
      this.router.navigate([url, {}]);
    })*/
  }


}
