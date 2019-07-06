import {Component} from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LocalDataSource} from 'ng2-smart-table';
import {Router} from '@angular/router';
import {RolService} from '../../services/rol.service';
import {deleteEmptyData} from '../../commons/app-utils';
import {Rol} from '../../models/rol';

@Component({
  selector: 'app-rol-list',
  templateUrl: './rol-list.component.html',
  styleUrls: ['./rol-list.component.scss'],
  providers:[SlimLoadingBarService]
})
export class RolListComponent  {
  list: Rol[];
  total: number;
  paginator: any;
  loading: boolean = false;
  mostrarFiltro: boolean = false;
  filterRolForm: FormGroup;
  source: LocalDataSource;
  settings = {
    mode: 'external',
    hideSubHeader: true,
    columns: {
      id: { title: 'Nombre', class: 'wide', width: '50%' },
      descripcion: { title: 'Descripcion', width: '70%' },

    },
    noDataMessage: 'No hay datos',
    actions: {
      custom: [


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
  constructor(private route: Router, private formBuild: FormBuilder, private slimLoadingBarService: SlimLoadingBarService, private service: RolService)
  {

  }
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
    this.filterRolForm = this.formBuild.group({
      id: [''],
    });
  }
  limpiar()
  {
    this.filterRolForm.reset();
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
    this.service.getRoles({
      count: this.paginator.cantidad,
      page: this.paginator.desde ,
      pagination: true,
      orderBy: 'id',
      orderDir: 'ASC',
      filters: JSON.stringify(deleteEmptyData(this.filterRolForm.value))
    })
      .subscribe(
        rs => {
          this.list = [];
          rs.dato.rows.forEach(a => {
            this.list.push(new Rol(a));
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
      this.service.getRoles({
        count: this.paginator.cantidad,
        page: this.paginator.desde ,
        pagination: true,
        orderBy: 'id',
        orderDir: 'ASC',
        filters: JSON.stringify(deleteEmptyData(this.filterRolForm.value))
      })
        .subscribe(
          rs => {
            setTimeout(function () {
            }, 2000);
            this.list = [];
            rs.dato.rows.forEach(a => {
              this.list.push(new Rol(a));
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
      this.service.getRoles({
        count: this.paginator.cantidad,
        page: this.paginator.desde,
        pagination: true,
        orderBy: 'id',
        orderDir: 'ASC',
        filters: JSON.stringify(deleteEmptyData(this.filterRolForm.value))
      })
        .subscribe(
          rs => {
            this.list = [];
            rs.dato.row.forEach(a => {
              this.list.push(new Rol(a));
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
