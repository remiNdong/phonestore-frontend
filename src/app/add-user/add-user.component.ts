import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserCreationDTO } from '../model/userCreationDTO.model';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  newUser = new UserCreationDTO();

  message!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(filter((params) => params['message']))
      .subscribe((params) => {
        console.log(params);

        this.message = params['message'];

        console.log(this.message);
      });
  }

  addUsager() {
    let regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    let testMail: boolean;
    testMail = regexp.test(this.newUser.username);
    


    let regexpTel = new RegExp(
      /^[0-9]{10}/
    );
    let testTel: boolean;
    testTel = regexpTel.test(this.newUser.numeroTel);
   
    

    if (!testMail) {
      this.router.navigate(['add-user'], {
        queryParams: { message: 'Veuillez entrer un email correct' },
      });
    }else if (!testTel) {
      this.router.navigate(['add-user'], {
        queryParams: { message: 'Veuillez entrer un numéro de télèphone correct' },
      });
    } else {
      this.userService.ajouterUsager(this.newUser).subscribe((mess) => {
        if (mess.message === 'Création nouvel usager réussie') {
          this.router.navigate(['succes'], {
            queryParams: { message: mess.message },
          });
        } else {
         
          this.router.navigate(['add-user'], {
            queryParams: { message: mess.message },
          });
        }
      });
    }
  }

  addEmploye() {
    let regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    let testMail: boolean;
    testMail = regexp.test(this.newUser.username);
    


    let regexpTel = new RegExp(
      /^[0-9]{10}/
    );
    let testTel: boolean;
    testTel = regexpTel.test(this.newUser.numeroTel);
   
    

    if (!testMail) {
      this.router.navigate(['add-user'], {
        queryParams: { message: 'Veuillez entrer un email correct' },
      });
    }else if (!testTel) {
      this.router.navigate(['add-user'], {
        queryParams: { message: 'Veuillez entrer un numéro de télèphone correct' },
      });
    } else {
      this.userService.ajouterEmploye(this.newUser).subscribe((mess) => {
        if (mess.message === 'Création nouvel employé réussie') {
          this.router.navigate(['succes'], {
            queryParams: { message: mess.message },
          });
        } else {
         
          this.router.navigate(['add-user'], {
            queryParams: { message: mess.message },
          });
        }
      });
    }
  }
}
