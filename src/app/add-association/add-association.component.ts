import { Component, OnInit } from '@angular/core';
import { AssociationmodelereparationDTO } from '../model/associationmodelereparationDTO.model';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ModeletelephoneService } from '../services/modeletelephone.service';

@Component({
  selector: 'app-add-association',
  templateUrl: './add-association.component.html',
  styleUrls: ['./add-association.component.css'],
})
export class AddAssociationComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modeletelephoneService: ModeletelephoneService
  ) {}

  newAssociation = new AssociationmodelereparationDTO();
  message!: string;

  ngOnInit(): void {
    this.newAssociation.praticable = 1;
    this.newAssociation.id=0;

    this.route.queryParams
    .pipe(filter((params) => params['message']))
    .subscribe((params) => {
      this.message = params['message'];
    });

    this.route.queryParams
      .pipe(filter((params) => params['idModele']))
      .subscribe((params) => {
        this.newAssociation.idModeletelephone = params['idModele'];
      });

    this.route.queryParams
      .pipe(filter((params) => params['idReparation']))
      .subscribe((params) => {
        this.newAssociation.idReparation = params['idReparation'];
      });

    this.route.queryParams
      .pipe(filter((params) => params['nomReparation']))
      .subscribe((params) => {
        this.newAssociation.nomReparation = params['nomReparation'];
      });

    this.route.queryParams
      .pipe(filter((params) => params['nomModele']))
      .subscribe((params) => {
        this.newAssociation.nomModele = params['nomModele'];
      });

    this.route.queryParams
      .pipe(filter((params) => params['nomMarque']))
      .subscribe((params) => {
        this.newAssociation.marqueModele = params['nomMarque'];
      });
  }

  addAssociation() {
    this.modeletelephoneService
      .ajouterReparation(this.newAssociation)
      .subscribe((mess) => {
        if (mess.message === 'Création nouvelle association réussie') {
          this.router.navigate(
            [`/associations-modele/${this.newAssociation.idModeletelephone}`],
            {
              queryParams: {
                queryParams: { message: mess.message },
              },
            }
          );
        } else {
          this.router.navigate(['add-association'], {
            queryParams: {
              message: mess.message,
              idModele: this.newAssociation.idModeletelephone,
              idReparation: this.newAssociation.idReparation,
              nomReparation: this.newAssociation.nomReparation,
              nomModele: this.newAssociation.nomModele,
              nomMarque: this.newAssociation.marqueModele,
            },
          });
        }
      });
  }
}
