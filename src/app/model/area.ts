export class Area {
  status:number;
  success:boolean;
  messages:string[];
  data: Data;
}
class Data {
  filas:number;
  areas: Area[];
}
class Areas {

  idArea:number;
  nomArea:string;
  idSucursal:number;
}
