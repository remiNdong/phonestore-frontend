import { Injectable } from '@angular/core';
import { Prestation } from '../model/prestation.model';
import { apiURL } from '../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrestationService {

  prestations! : Prestation[];

  apiURLPrestations : string = apiURL + 'prestations';

  constructor(private http: HttpClient, private authService: AuthService) {}



  listePrestations(username : string): Observable<Prestation[]> {

    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    const url = `${this.apiURLPrestations}/list/${username}`;

    return this.http.get<Prestation[]>(url, {
      headers: httpHeaders,
    });
  }

  consulterPrestation(id : number): Observable<Prestation> {

    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    const url = `${this.apiURLPrestations}/one/${id}`;

    return this.http.get<Prestation>(url, {
      headers: httpHeaders,
    });
  }
  
}
