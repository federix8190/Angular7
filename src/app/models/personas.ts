export class Personas {
    nombres: string;
    apellidos: string;
    email: string;
    latitud: string;
    longitud: string;
    telefono?: string;
    fechaNacimiento: number;
    sexo: string;
    direccion?: any;
    ruc?: string;
    documento: string;
    id: number;

    constructor(data){
        this.nombres = data.nombres;
        this.apellidos = data.apellidos;
        this.email = data.email;
        this.latitud = data.latitud;
        this.longitud = data.longitud;
        this.telefono = data.telefono;
        this.fechaNacimiento = data.fechaNacimiento;
        this.sexo = data.sexo;
        this.direccion = data.direccion;
        this.ruc = data.ruc;
        this.documento = data.documento;
        this.id = data.id;
    }
}