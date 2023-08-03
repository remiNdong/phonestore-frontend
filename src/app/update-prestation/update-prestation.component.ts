import { Component, OnInit } from '@angular/core';
import { Prestation } from '../model/prestation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestationService } from '../services/prestation.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-update-prestation',
  templateUrl: './update-prestation.component.html',
  styleUrls: ['./update-prestation.component.css'],
})
export class UpdatePrestationComponent implements OnInit {
  currentPrestation = new Prestation();
  message! : string;
  updatedStatus! : string;

  allStatus=["CREE","EN ATTENTE PIECE", "TERMINE", "RECUPERE"];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private prestationService: PrestationService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    if (!this.authService.isEmployeOrUsager()) {
      this.router.navigate(['app-forbidden']);
    } else {
      this.prestationService
        .consulterPrestation(this.activatedRoute.snapshot.params['id'])
        .subscribe((presta) => {
          this.currentPrestation = presta;
          this.updatedStatus=this.currentPrestation.status;
          if (
            this.authService.isUsager() &&
            this.authService.loggedUser !=
              this.currentPrestation.identifiantUsager
          ) {
            this.router.navigate(['forbidden']);
          }
        });
    }
  }


  updatePrestation(){

  }
}
