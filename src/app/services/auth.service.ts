import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserLoginDTO } from '../model/userLoginDTO.model';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root',
})
export class AuthService {



  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles!: string[];
  private helper = new JwtHelperService();

  apiURL: string = 'http://localhost:8081';
  token!: string;

  constructor(private router: Router, private http: HttpClient) {}

  login(userLoginDTO: UserLoginDTO) {
    return this.http.post<User>(this.apiURL + '/login', userLoginDTO, {
      observe: 'response',
    });
  }

  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }

  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    this.decodeJWT();
  }

  getToken(): string {
    return this.token;
  }
  
  decodeJWT() {
    if (this.token == undefined) {
      this.isloggedIn = false;
      return;
    }
   
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
    this.isloggedIn=true;
  }


  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token = undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  

  isEmploye(): Boolean {
    console.log(this.roles);

    if (!this.roles) return false;
    //this.roles== undefiened

    return this.roles.indexOf('EMP') > -1;
  }

  isUsager(): Boolean {
    console.log(this.roles);

    if (!this.roles) return false;
    //this.roles== undefiened

    return this.roles.indexOf('USER') > -1;
  }


  
  isAdmin(): Boolean {
    console.log(this.roles);

    if (!this.roles) return false;
    //this.roles== undefiened

    return this.roles.indexOf('ADMIN') > -1;
  }


  isFromTeam(){

    return this.isAdmin() || this.isEmploye();
  }

  isEmployeOrUsager(){

    return this.isEmploye() || this.isUsager();
  }

  isTokenExpired(): Boolean {
    return this.helper.isTokenExpired(this.token);
  }

 
}
