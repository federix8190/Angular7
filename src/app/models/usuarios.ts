export class Usuarios {
  nombres: string;
  apellidos: string;
  email: string;
  username: string;

  constructor(data){
    this.nombres = data.nombres;
    this.apellidos = data.apellidos;
    this.email = data.mail;
    this.username = data.userName;
  }
}
