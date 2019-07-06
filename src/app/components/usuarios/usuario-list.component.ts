import {Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';

import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Usuarios} from '../../models/usuarios';
import {Personas} from '../../models/personas';
import {LocalDataSource} from 'ng2-smart-table';
import {UsuarioService} from '../../services/usuario.service';
import {deleteEmptyData} from '../../commons/app-utils';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {ConfirmDialogService} from '../../services/confirm-dialog.service';

@Component({
    selector: 'app-usuario-list',
    templateUrl: './usuario-list.component.html',
    styleUrls: ['./usuario-list.component.scss'],
    providers:[UsuarioService, SlimLoadingBarService]
})
export class UsuarioListComponent  implements OnInit {

    list: Usuarios[];
    total: number;
    paginator: any;
    loading: boolean = false;
    mostrarFiltro: boolean = false;
    filterUserForm: FormGroup;
    source: LocalDataSource;

    settings = {
        mode: 'external',
        hideSubHeader: true,
        columns: {
          nombres: { title: 'Nombres', class: 'wide', width: '60%' },
          apellidos: { title: 'Apellidos', width: '60%' },
          username: { title: 'Código Usuario', width: '50%' },
          email: { title: 'Email', width: '60%' }
        },
        noDataMessage: 'No hay datos',
        actions: {
            custom: [{
                name: 'viewAction',
                title: '<i class="fas fa-user-cog" title="Asignar Roles"></i>'
              }, {
                name: 'editAction',
                title: '&nbsp;&nbsp;<i class="far fa-edit" title="Editar"></i>'
              }, {
                name: 'deleteAction',
                title: '&nbsp;&nbsp;<i class="far fa-trash-alt" title="Eliminar"></i>'
              }
            ],
            columnTitle: 'Acciones',
            position: 'right',
            add: false,
            edit: false,
            delete: false
        },
        attr: {
            class: 'table table-bordered'
        }
    };

    constructor(private route: Router, private formBuild: FormBuilder,   
        private slimLoadingBarService: SlimLoadingBarService,
        private service: UsuarioService, private confirmDialogService: ConfirmDialogService)
    {}

    ngOnInit(): void {
        this.createFormFilter();
        this.initFiltros();
    }

    createFormFilter() {
        this.filterUserForm = this.formBuild.group({
            nombres: [''],
            apellidos : [''],
            userName:  [''],
            /*CorreoUsuario:  ['', [Validators.required, Validators.email]],*/
        });
    }

    limpiar() {
        this.filterUserForm.reset();
        this.initFiltros();
    }

    initFiltros() {
        this.paginator = {
            cantidad: 3,
            pagina: 1,
            total: 0
        }
        this.paginator.desde = this.paginator.pagina;
        this.paginator.hasta = (this.paginator.pagina) * this.paginator.cantidad;
        this.buscar();
    }

    buscar() {
        this.slimLoadingBarService.start(() => {
          console.log('Loading complete');
        });
        console.log('Buscar : ', this.paginator.desde);
        this.service.getUsuarios({
            count: this.paginator.cantidad,
            page: this.paginator.pagina ,
            pagination: true,
            orderBy: 'id',
            orderDir: 'ASC',
            filters: JSON.stringify(deleteEmptyData(this.filterUserForm.value))
        }).subscribe(
            rs => {
                this.list = [];
                rs.dato.rows.forEach(a => {
                  this.list.push(new Usuarios(a));
                });
                this.total = rs.dato.count;
                this.paginator.total = this.total;
                this.source = new LocalDataSource();
                this.source.load(this.list);
                this.slimLoadingBarService.complete();
            },
            er => { },
            () => { }
        );
    } 

    toggleFiltro() {
        if (this.mostrarFiltro) {
          this.mostrarFiltro = false;
        } else {
          this.mostrarFiltro = true;
        }
    }

    crear() {
      this.route.navigate(['/configuraciones/usuarios/nuevo']);
    }

    onCustomAction(event) {
        if (event.action == 'viewAction') {
            this.route.navigate(['configuraciones/usuarios/' 
                    + event.data.username + '/asignar/roles']);
        }
        if (event.action == 'deleteAction') {
          console.log("Eliminar")
          console.log(event);
          this.confirmDialogService.confirm('Por favor confirme', 'Esta seguro que desea eliminar el registro?')
            .then((confirmed) =>
            {
              /**llamar al borrar**/
              if (confirmed==true)
              {
                this.slimLoadingBarService.start(() => {
                  console.log('Loading complete');
                });
                this.service.eliminarUsuario(event.data.username).subscribe(response => {
                this.buscar();
                this.slimLoadingBarService.complete();
              }, er => { },
                  () => { })
              }
            })
            .catch(() =>
              console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)')
            );
        }
        if (event.action == 'editAction') {
          this.route.navigate(['configuraciones/usuarios/' + event.data.username + '/editar']);
        }
    }

    pagination(step: number) {
        if (step > 0) {
          this.slimLoadingBarService.start(() => {
            console.log('Loading complete');
          });
          console.log('pagination 1 : ', this.paginator.desde, ' - ', this.paginator.hasta);

          if (this.paginator.hasta < this.paginator.total) {

              this.paginator.desde = this.paginator.pagina * this.paginator.cantidad + 1;
              this.paginator.hasta = (this.paginator.pagina + 1) * this.paginator.cantidad;
              this.paginator.pagina = this.paginator.pagina + 1;

              console.log('pagination 1 : ', this.paginator.desde, ' - ', this.paginator.hasta);
              this.service.getUsuarios({
                  count: this.paginator.cantidad,
                  page: this.paginator.pagina ,
                  pagination: true,
                  orderBy: 'id',
                  orderDir: 'ASC',
                  filters: JSON.stringify(deleteEmptyData(this.filterUserForm.value))
              }).subscribe(
                  rs => {
                    setTimeout(function () {
                    }, 2000);
                    this.list = [];
                    rs.dato.rows.forEach(a => {
                        this.list.push(new Usuarios(a));
                    });
                    this.total = rs.dato.rows.count;
                    this.paginator.total = this.total;
                    this.source = new LocalDataSource(this.list);
                    this.slimLoadingBarService.complete();
                  },
                  er => { },
                  () => { }
              );
          }
          
        } else {
            this.slimLoadingBarService.start(() => {
              console.log('Loading complete');
            });
            this.paginator.pagina = this.paginator.pagina - 1;
            console.log('pagination 2 : ', this.paginator.pagina);

            if (this.paginator.pagina > 0) {

                this.paginator.desde = (this.paginator.pagina - 1) * this.paginator.cantidad + 1;
                this.paginator.hasta = this.paginator.pagina * this.paginator.cantidad;

                this.service.getUsuarios({
                    count: this.paginator.cantidad,
                    page: this.paginator.pagina,
                    pagination: true,
                    orderBy: 'id',
                    orderDir: 'ASC',
                    filters: JSON.stringify(deleteEmptyData(this.filterUserForm.value))
                }).subscribe(
                    rs => {
                        this.list = [];
                        rs.dato.rows.forEach(a => {
                            this.list.push(new Usuarios(a));
                        });
                        this.total = rs.dato.count;
                        this.paginator.total = this.total;
                        this.source = new LocalDataSource(this.list);
                        this.slimLoadingBarService.complete();
                    },
                    er => { },
                    () => { }
                );
            }
            
            
        }
    }

}
