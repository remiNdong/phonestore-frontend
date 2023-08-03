import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Prestation } from '../model/prestation.model';
import { PrestationService } from '../services/prestation.service';

@Component({
  selector: 'app-usager',
  templateUrl: './usager.component.html',
  styleUrls: ['./usager.component.css'],
})
export class UsagerComponent implements OnInit {
  usager = new User();
  prestations! : Prestation[];
  message?: string;
 
  listeVide =false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    public authService: AuthService,
    public prestationService : PrestationService
  ) {}

  ngOnInit() {
    if (!this.authService.isEmployeOrUsager()) {
      this.router.navigate(['app-forbidden']);
    } else if (
      this.authService.isUsager() &&
      this.authService.loggedUser !=
        this.activatedRoute.snapshot.params['username']
    ) {
      this.router.navigate(['forbidden']);
    } else {
      this.userService
        .consulterUsager(this.activatedRoute.snapshot.params['username'])
        .subscribe((usa) => {
          this.usager = usa;
          this.prestationService.listePrestations(this.usager.username).subscribe((presta) => {
            this.prestations = presta;
            if(this.prestations.length==0){
              this.listeVide=true;
              this.message="Pas de prestations enregistrées"
            }
          });

        
        });

        

        

    }
  }
}
