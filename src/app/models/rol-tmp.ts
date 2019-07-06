export class RolTmp {
  id: string;
  descripcion: string;
  constructor(data) {
    this.id = data.rolName;
    this.descripcion = data.rolName;
  }
}
