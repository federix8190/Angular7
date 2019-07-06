export class Rol {
  id: string;
  descripcion: string;
  constructor(data) {
    this.id = data.id;
    this.descripcion = data.name;
  }
}
