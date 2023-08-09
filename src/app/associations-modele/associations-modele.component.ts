import { Component, OnInit } from '@angular/core';
import { ModeletelephoneService } from '../services/modeletelephone.service';
import { AssociationmodelereparationDTO } from '../model/associationmodelereparationDTO.model';
import { ActivatedRoute ,Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Modeletelephone } from '../model/modeletelephone.model';
import { ReparationDTO } from '../model/reparationDTO.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-associations-modele',
  templateUrl: './associations-modele.component.html',
  styleUrls: ['./associations-modele.component.css'],
})
export class AssociationsModeleComponent implements OnInit {
  associations?: AssociationmodelereparationDTO[];
  reparationsNonPratiquees?: ReparationDTO[];
  currentModele = new Modeletelephone();
  err: number = 0;
  message?: string;
  messageReparation?:string;
  listeVide =false;
  messageCreateUpdate ="";
 
  listeReparationsVide=false;

  constructor(
    private modeletelephoneService: ModeletelephoneService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {

    this.activatedRoute.queryParams
    .pipe(filter((params) => params['message']))
    .subscribe((params) => {
      console.log(params);

      this.messageCreateUpdate = params['message'];

    
    });
    
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

      this.modeletelephoneService
      .listeReparationsNonPratiquees(this.activatedRoute.snapshot.params['id'])
      .subscribe((repa) => {
        if (repa.length == 0) {
          this.listeReparationsVide=true;
          this.messageReparation = 'Toutes les types de réparations sont déja pratiquées sur ce modèle';
        } else {
          this.reparationsNonPratiquees = repa;
        }
      });
  }

  

  ajouterReparation(idModele:number,idReparation:number, nomReparation:string, nomModele:string,nomMarque:string){

    this.router.navigate(['add-association'], {
      queryParams: {
        idModele: idModele,idReparation:idReparation, nomReparation : nomReparation,nomModele:nomModele,nomMarque:nomMarque
      },
    });

  }
}
