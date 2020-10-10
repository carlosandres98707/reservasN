import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
 apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  protected generateAuthBasicHeaders():HttpHeaders{
    return new HttpHeaders({
    'Content-Type': 'application/json'
    });
  }

//Leer los departamentos
  getDepartamentos(): any{

    return this.http.get<any>(this.apiUrl+"/departamentos");


  }

  //Registrar departamentos

  insertarDepartamento(departamento)
  {
    return this.http.post<any>(this.apiUrl+"/departamentos",
                               JSON.stringify(departamento),
                               {headers:this.generateAuthBasicHeaders()});
  }
}
