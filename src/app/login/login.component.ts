import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserLoginDTO } from '../model/userLoginDTO.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  erreur=0;

  userLoginDTO = new UserLoginDTO();

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLoggedin() {
    this.authService.login(this.userLoginDTO).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
       this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.erreur = 1;
      },
    });
  }
}
