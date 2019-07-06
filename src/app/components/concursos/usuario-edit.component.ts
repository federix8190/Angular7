import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DatePipe } from '@angular/common';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { Personas } from 'src/app/models/personas';
import { LocalDataSource } from 'ng2-smart-table';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { PersonasService } from 'src/app/services/personas.service';
import { deleteEmptyData } from '../../commons/app-utils';
import {Usuarios} from '../../models/usuarios';
@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.scss'],
  /*providers:[PersonasService, SlimLoadingBarService]*/
})
export class UsuarioEditComponent implements OnInit {

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
      ruc: { title: 'RUC', width: '40%' },
      documento: { title: 'Doc. Identidad', width: '50%' }
    },
    noDataMessage: 'No hay datos',
    actions: {
      custom: [
        {
          name: 'viewAction',
          title: '<i class="fas fa-arrow-right" title="Seleccionar"></i>'
        },
      ],
      columnTitle: 'Seleccionar',
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
  id:string='';
  personas=[];
  tipos=[];
  today='';
  usuarioForm: FormGroup;
  editar:boolean=false;
  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private slimLoadingBarService: SlimLoadingBarService,
    private datePipe: DatePipe,
    private fb: FormBuilder,
    public router: Router,
   ) {
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
        documento: [''],
      });
  }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('username');
    console.log(this.id);
    if (this.id != null)
    {
      this.editar=true;
      /**es editar, traer los datos del usuario**/
      this.createFormEdit();
      let data ={
        userName: this.id
      };
      this.slimLoadingBarService.start(() => {
        console.log('Loading complete');
      });
      this.usuarioService.getUsuarios({
        count: 1,
        page: 1,
        pagination: false,
        orderBy: 'id',
        orderDir: 'ASC',
        filters: JSON.stringify(deleteEmptyData(data))
      }).subscribe(resp=>{
        if (!resp.error)
        {

          this.setearForm( new Usuarios(resp.dato.rows[0]));
        }
        else
        {
          /**mostrar error**/
        }
      })

    }
    else
    {
      this.createForm();
    }

  }



  createForm()
  {
    this.usuarioForm = this.fb.group({
      nombreUsuario: ['', [Validators.required]],
      apellidoUsuario: ['', [Validators.required]],
      codigoUsuario:  ['', [Validators.required]],
      passwordUsuario: ['', [Validators.minLength(6)]],
      CorreoUsuario:  ['', [Validators.required, Validators.email]],
    });
  }
  createFormEdit()
  {
    this.usuarioForm = this.fb.group({
      nombreUsuario: ['', [Validators.required]],
      apellidoUsuario: ['', [Validators.required]],
      codigoUsuario:  ['', [Validators.required]],
      CorreoUsuario:  ['', [Validators.required, Validators.email]],
    });
  }
  setearForm( user: Usuarios)
  {
    this.usuarioForm.controls['nombreUsuario'].setValue(user.nombres);
    this.usuarioForm.controls['apellidoUsuario'].setValue(user.apellidos);
    this.usuarioForm.controls['codigoUsuario'].setValue(user.username);
    this.usuarioForm.controls['CorreoUsuario'].setValue(user.email);
  }
  actualizarUsuario()
  {
    this.usuarioService.modificarUsuario(this.prepararUsuario()).subscribe(resp=>{
      if (!resp.dato.error)
      {
        console.log("OK");
        this.router.navigate(['configuraciones/usuarios']);
      }
      else {
        console.log("ERROR");
      }
    })
  }
  get f() { return this.usuarioForm.controls; }

  /*idPersona;
  usuarioConfirmado;

  get codigoUsuario() {
    return this.usuarioForm.get('codigoUsuario');
  }

  get idUsuarioTipo() {
    return this.usuarioForm.get('idUsuarioTipo');
  }

  getTipos(): void {
    this.usuarioService.getTipos().subscribe(tipos => {
      this.tipos = tipos;
      //this.usuarioForm.get('idUsuarioTipo').setValue(this.tipos[0]);
    })
  }

  getPersonas(id?: string): void {
    this.usuarioService.getPersonas().subscribe(personas => {
      this.personas = personas;
    })in
  }

  formatDate(): void {
    this.today = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
    this.usuarioForm.patchValue({
      fechaCreacion: (new Date()).getTime()
    })
  }*/
  prepararUsuario():any
  {
    if (this.editar)
    {
      let objUsuario = {
        "nombres":this.usuarioForm.get("nombreUsuario").value,
        "apellidos":this.usuarioForm.get("apellidoUsuario").value,
        "userName":this.usuarioForm.get("codigoUsuario").value,
        "mail":this.usuarioForm.get("CorreoUsuario").value
      };
      return objUsuario;
    }
    else
    {
      let objUsuario = {
        "nombres":this.usuarioForm.get("nombreUsuario").value,
        "apellidos":this.usuarioForm.get("apellidoUsuario").value,
        "userName":this.usuarioForm.get("codigoUsuario").value,
        "password":this.usuarioForm.get("passwordUsuario").value,
        "mail":this.usuarioForm.get("CorreoUsuario").value
      };
      return objUsuario;
    }
  }
  crearUsuario(): void {
    this.usuarioService.crearUsuario(JSON.stringify(this.prepararUsuario())).subscribe(response => {
      if (!response.error)
      {
        this.router.navigate(['configuraciones/usuarios']);
      }
      console.log(response);
    });
  }


}
