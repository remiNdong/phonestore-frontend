import { Component, OnInit } from '@angular/core';
import { ModeletelephoneService } from '../services/modeletelephone.service';
import { AssociationmodelereparationDTO } from '../model/associationmodelereparationDTO.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Modeletelephone } from '../model/modeletelephone.model';

@Component({
  selector: 'app-associations-modele',
  templateUrl: './associations-modele.component.html',
  styleUrls: ['./associations-modele.component.css'],
})
export class AssociationsModeleComponent implements OnInit {
  associations?: AssociationmodelereparationDTO[];
  currentModele = new Modeletelephone();
  err: number = 0;
  message?: string;
  listeVide =false;

  constructor(
    private modeletelephoneService: ModeletelephoneService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.modeletelephoneService
      .consulterModele(this.activatedRoute.snapshot.params['id'])
      .subscribe((mod) => {
        this.currentModele = mod;
      });

    this.modeletelephoneService
      .listeAssociations(this.activatedRoute.snapshot.params['id'])
      .subscribe((asso) => {
        if (asso.length == 0) {
          this.listeVide=true;
          this.message = 'Pas de réparations possibles sur ce modèle';
        } else {
          this.associations = asso;
        }
      });
  }

  deleteAssociation(id:number){
    
  }
}
