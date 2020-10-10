import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  protected generateAuthBasicHeaders():HttpHeaders{
    return new HttpHeaders({
    'Content-Type': 'application/json'
    });
  }

  getAreas(): any{

    return this.http.get<any>(this.apiUrl+"/areas");


  }

  //Registrar departamentos

  insertarArea(area)
  {
    return this.http.post<any>(this.apiUrl+"/areas",
                               JSON.stringify(area),
                               {headers:this.generateAuthBasicHeaders()});
  }
}
