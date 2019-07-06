import {Component, OnInit} from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {Usuarios} from '../../../models/usuarios';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LocalDataSource} from 'ng2-smart-table';
import {Router} from '@angular/router';
import {UsuarioService} from '../../../services/usuario.service';
import {ConfirmDialogService} from '../../../services/confirm-dialog.service';
import {deleteEmptyData} from '../../../commons/app-utils';
import {Concurso} from '../../../models/concurso';
import {TipoConcursoService} from '../../../services/tipo-concurso.service';

@Component({
  selector: 'app-concurso-list',
  templateUrl: 'concurso-list.component.html',
  styleUrls: ['concurso-list.component.scss'],
  providers:[SlimLoadingBarService]
})
export class ConcursoListComponent  implements  OnInit{
  list: Concurso[];
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
      nombre: { title: 'Nombre ', class: 'wide', width: '60%' },
    },
    noDataMessage: 'No hay datos',
    actions: {
      custom: [
        {
          name: 'editAction',
          title: '&nbsp;&nbsp;<i class="far fa-edit" title="Editar"></i>'
        },
        {
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
  constructor(private route: Router, private formBuild: FormBuilder,   private slimLoadingBarService: SlimLoadingBarService,
              private service: TipoConcursoService, private confirmDialogService: ConfirmDialogService)
  {}
  ngOnInit(): void {
    this.paginator = {
      cantidad: 10,
      pagina: 0,
      total: 0
    }
    this.paginator.desde = this.paginator.pagina + 1;
    this.paginator.hasta = (this.paginator.pagina + 1) * this.paginator.cantidad;
    this.createFormFilter();
    this.buscar();
  }
  createFormFilter()
  {
    this.filterUserForm = this.formBuild.group({
      nombre: [''],
    });
  }
  limpiar()
  {
    this.filterUserForm.reset();
    this.paginator = {
      cantidad: 10,
      pagina: 0,
      total: 0
    }
    this.paginator.desde = this.paginator.pagina + 1;
    this.paginator.hasta = (this.paginator.pagina + 1) * this.paginator.cantidad;
    this.buscar();
  }
  buscar()
  {
    this.slimLoadingBarService.start(() => {
      console.log('Loading complete');
    });
    this.service.getTiposConcurso({
      count: this.paginator.cantidad,
      page: this.paginator.desde ,
      pagination: true,
      orderBy: 'id',
      orderDir: 'ASC',
      filters: JSON.stringify(deleteEmptyData(this.filterUserForm.value))
    })
      .subscribe(
        rs => {
          this.list = [];
          rs.dato.rows.forEach(a => {
            this.list.push(new Concurso(a));
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

  crear()
  {
    this.route.navigate(['/configuraciones/usuarios/nuevo']);
  }
  onCustomAction(event) {
   /* if (event.action == 'deleteAction') {
      console.log("Eliminar")
      console.log(event);
      this.confirmDialogService.confirm('Por favor confirme', 'Esta seguro que desea eliminar el registro?')
        .then((confirmed) =>
        {
          /**llamar al borrar**/
          /*if (confirmed==true)
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
    }*/
  }
  pagination(step: number) {
    if (step > 0) {
      this.slimLoadingBarService.start(() => {
        console.log('Loading complete');
      });
      if (this.paginator.hasta < this.paginator.total) {
        this.paginator.pagina = this.paginator.pagina + 1;
        this.paginator.desde = this.paginator.pagina * this.paginator.cantidad + 1;
        this.paginator.hasta = (this.paginator.pagina + 1) * this.paginator.cantidad;
      }
      this.service.getTiposConcurso({
        count: this.paginator.cantidad,
        page: this.paginator.desde ,
        pagination: true,
        orderBy: 'id',
        orderDir: 'ASC',
        filters: JSON.stringify(deleteEmptyData(this.filterUserForm.value))
      })
        .subscribe(
          rs => {
            setTimeout(function () {
            }, 2000);
            this.list = [];
            rs.dato.rows.forEach(a => {
              this.list.push(new Concurso(a));
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
    else {
      this.slimLoadingBarService.start(() => {
        console.log('Loading complete');
      });
      if (this.paginator.pagina > 0) {
        this.paginator.pagina = this.paginator.pagina;
        this.paginator.desde = this.paginator.pagina * this.paginator.cantidad + 1;
        this.paginator.hasta = (this.paginator.pagina + 1) * this.paginator.cantidad;
      }
      this.service.getTiposConcurso({
        count: this.paginator.cantidad,
        page: this.paginator.desde,
        pagination: true,
        orderBy: 'id',
        orderDir: 'ASC',
        filters: JSON.stringify(deleteEmptyData(this.filterUserForm.value))
      })
        .subscribe(
          rs => {
            this.list = [];
            rs.dato.row.forEach(a => {
              this.list.push(new Concurso(a));
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
