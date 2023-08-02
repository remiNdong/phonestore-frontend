import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { apiAdministrationURL, apiURL } from '../config';
import { UserCreationDTO } from '../model/userCreationDTO.model';
import { MessageDTO } from '../model/messageDTO.model';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURLCreateEmploye: string = apiAdministrationURL + 'addemploye';
  apiURLCreateUsager: string = apiAdministrationURL + 'addusager';
  apiURLAdministrationUsager : string = apiURL+ 'usagers';

  constructor(private http: HttpClient, private authService: AuthService) {}


  ajouterEmploye(userCreationDTO: UserCreationDTO): Observable<MessageDTO> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    return this.http.post<MessageDTO>(this.apiURLCreateEmploye, userCreationDTO, {
      headers: httpHeaders,
    });
  }

  ajouterUsager(userCreationDTO: UserCreationDTO): Observable<MessageDTO> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    return this.http.post<MessageDTO>(this.apiURLCreateUsager, userCreationDTO, {
      headers: httpHeaders,
    });
  }

  listeUsagers(): Observable<User[]> {

    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    
    const url = `${this.apiURLAdministrationUsager}/all`;

    return this.http.get<User[]>(url , {
      headers: httpHeaders,
    });
  }

  rechercherParNom(nom : string) : Observable<User[]>{

    

    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    
    const url = `${this.apiURLAdministrationUsager}/all/${nom}`;

    return this.http.get<User[]>(url , {
      headers: httpHeaders,
    });


  }

  rechercherParMail(mail : string) : Observable<User[]>{

    

    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    
    const url = `${this.apiURLAdministrationUsager}/one/${mail}`;

    return this.http.get<User[]>(url , {
      headers: httpHeaders,
    });


  }

}
