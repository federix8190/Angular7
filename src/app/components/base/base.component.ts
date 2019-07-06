import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms';;
import { PersonasService } from 'src/app/services/personas.service';
import { Personas } from 'src/app/models/personas';
import { LocalDataSource } from 'ng2-smart-table';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import {  deleteEmptyData } from '../../commons/app-utils';
@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [PersonasService, DatePipe]
})
export class BaseComponent implements OnInit {

  list: Personas[] = [];
  total: number;
  paginator: any;
  loading: boolean = false;
  mostrarFiltro: boolean = false;
  filterForm: FormGroup;
  settings = {
    mode: 'external',
    hideSubHeader: true,
    columns: {
      nombres: { title: 'Nombre', class: 'wide' },
      apellidos: { title: 'Apellido', width: '50%' },
      direccion: { title: 'Dirección', width: '50%' },
      ruc: { title: 'RUC', width: '40%' },
      documento: { title: 'Doc. Identidad', width: '50%' },
      email: { title: 'Email', width: '50%' },
      fechaNacimiento: {
        title: 'Fech. Nacimiento', width: '50%',

        valuePrepareFunction: (date) => {
          var raw = new Date(date);

          var formatted = this.datePipe.transform(raw, 'dd/MM/yyyy');
          return formatted;
        }
      },
      sexo: { title: 'sexo', width: '50%' },
      telefono: { title: 'Telefono', width: '50%' }
    },
    noDataMessage: 'No hay datos',
    actions: {
      custom: [
        {
          name: 'viewAction',
          title: '<i class="fas fa-info-circle" title="Ver"></i>'
        },
        {
          name: 'deleteAction',
          title: '&nbsp;&nbsp;<i class="far fa-trash-alt" title="Eliminar"></i>'
        },
        {
          name: 'editAction',
          title: '&nbsp;&nbsp;<i class="far fa-edit" title="Editar"></i>'
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

  source: LocalDataSource;


  constructor(private service: PersonasService,
    private slimLoadingBarService: SlimLoadingBarService,
    private datePipe: DatePipe,
    private router: Router,
    private fb: FormBuilder) {
    this.paginator = {
      cantidad: 5,
      pagina: 0,
      total: 0
    }
    this.paginator.desde = this.paginator.pagina + 1;
    this.paginator.hasta = (this.paginator.pagina + 1) * this.paginator.cantidad;

    this.filterForm = this.fb.group({
      nombres: [''],
      apellidos: [''],
      direccion: [''],
      documento: [''],
      ruc: [''],
      email: [''],
      fechaNacimiento: [''],
      sexo: ['']

    });
  }

  ngOnInit() {
    this.slimLoadingBarService.start(() => {
      console.log('Loading complete');
    });
    this.service.get({
      cantidad: this.paginator.cantidad,
      inicio: this.paginator.desde - 1,
      orderBy: 'id',
      orderDir: 'ASC'
    })
      .subscribe(
        rs => {
          this.list = [];
          rs.lista.forEach(a => {
            this.list.push(new Personas(a));
          });
          this.total = rs.total;
          this.paginator.total = this.total;
          this.source = new LocalDataSource();
          this.source.load(this.list);
          this.slimLoadingBarService.complete();
        },
        er => { },
        () => { }
      );
  }

  onCustomAction(event) {
    console.log("Event");
    console.log(event);
    if (event.action == 'viewAction') {
      this.router.navigate(['/pages/ourPage']);
    }
    if (event.action == 'deleteAction') {
      this.router.navigate(['/pages/ourPage']);
    }
    if (event.action == 'editAction') {
      this.router.navigate(['/pages/ourPage']);
    }
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
      this.service.get({
        cantidad: this.paginator.cantidad,
        inicio: this.paginator.desde - 1,
        orderBy: 'id',
        orderDir: 'ASC'
      })
        .subscribe(
          rs => {
            setTimeout(function () {
              //do what you need here
            }, 2000);
            this.list = [];
            rs.lista.forEach(a => {
              this.list.push(new Personas(a));
            });
            this.total = rs.total;
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
        this.paginator.pagina = this.paginator.pagina - 1;
        this.paginator.desde = this.paginator.pagina * this.paginator.cantidad + 1;
        this.paginator.hasta = (this.paginator.pagina + 1) * this.paginator.cantidad;
      }
      this.service.get({
        cantidad: this.paginator.cantidad,
        inicio: this.paginator.desde - 1,
        orderBy: 'id',
        orderDir: 'ASC'
      })
        .subscribe(
          rs => {
            this.list = [];
            rs.lista.forEach(a => {
              this.list.push(new Personas(a));
            });
            this.total = rs.total;
            this.paginator.total = this.total;
            this.source = new LocalDataSource(this.list);
            this.slimLoadingBarService.complete();
          },
          er => { },
          () => { }
        );
    }
  }
  toggleFiltro() {
    if (this.mostrarFiltro) {
      this.mostrarFiltro = false;
    } else {
      this.mostrarFiltro = true;
    }
  }

  limpiar() {
    this.filterForm.reset();
  }

  buscar() {
    this.slimLoadingBarService.start(() => {
      console.log('Loading complete');
    });
    this.service.get({
      cantidad: this.paginator.cantidad,
      inicio: this.paginator.desde - 1,
      orderBy: 'id',
      orderDir: 'ASC',
      filtros: JSON.stringify(deleteEmptyData(this.filterForm.value))
    })
      .subscribe(
        rs => {
          this.list = [];
          rs.lista.forEach(a => {
            this.list.push(new Personas(a));
          });
          this.total = rs.total;
          this.paginator.total = this.total;
          this.source = new LocalDataSource();
          this.source.load(this.list);
          this.slimLoadingBarService.complete();
        },
        er => { },
        () => { }
      );
  }


}
