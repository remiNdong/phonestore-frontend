import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { apiAdministrationURL } from '../config';
import { UserCreationDTO } from '../model/userCreationDTO.model';
import { MessageDTO } from '../model/messageDTO.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURLCreateEmploye: string = apiAdministrationURL + 'addemploye';
  apiURLCreateUsager: string = apiAdministrationURL + 'addusager';

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

}
