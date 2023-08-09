import { Component, OnInit } from '@angular/core';
import { Marque } from '../model/marque.model';
import { ModeletelephoneService } from '../services/modeletelephone.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Modeletelephone } from '../model/modeletelephone.model';
import { AssociationmodelereparationDTO } from '../model/associationmodelereparationDTO.model';
import { PrestationCreationDTO } from '../model/prestationCreationDTO.model';
import { PrestationService } from '../services/prestation.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-create-prestation',
  templateUrl: './create-prestation.component.html',
  styleUrls: ['./create-prestation.component.css']
})
export class CreatePrestationComponent  implements OnInit{

  newPrestation = new PrestationCreationDTO();
  chosenAssociation=new AssociationmodelereparationDTO();
  marques!: Marque[];
  idMarque!: number;
  modeles?: Modeletelephone[];
  message! : string;

 
  associations? : AssociationmodelereparationDTO [];
  
  messageAssociation! : string;
  associationsVide=false;
 
  


  constructor(
    private modeletelephoneService: ModeletelephoneService,
    private router: Router,
    private route: ActivatedRoute,
    private prestationService : PrestationService
  ) {}

  
  ngOnInit(): void{

   
    this.newPrestation.identifiantUsager=this.route.snapshot.params['username'];
    this.newPrestation.status="CREE";

    this.route.queryParams
      .pipe(filter((params) => params['message']))
      .subscribe((params) => {
        console.log(params);

        this.message = params['message'];

        console.log(this.message);
      });


    this.modeletelephoneService.listeMarques().subscribe((marquesTel) => {
      this.marques = marquesTel;
  
    });



  }

  onChangeMarque() {
    this.modeletelephoneService
      .rechercherPaMarque(this.idMarque)
      .subscribe((mod) => {
        this.modeles = mod;
      });
      
  }

  onChangeModele(){

    this.modeletelephoneService
    .listeAssociationsPratiquees(this.newPrestation.idModele)
    .subscribe((asso) => {
      if (asso.length == 0) {
        this.associationsVide=true;
        this.messageAssociation = 'Pas de réparations possibles sur ce modèle - Veuillez en créer auparavant';
        
      } else {
        this.associationsVide=false;
        this.messageAssociation='';
        this.associations = asso;
      }
    
    });
  
  }

  addPrestation(){

   

      this.prestationService
        .ajouterPrestation(this.newPrestation)
        .subscribe((mess) => {
          if (mess.message === 'Création de la prestation réussie') {
           

            this.router.navigate([`usager/${this.newPrestation.identifiantUsager}`], {
              queryParams: { message: mess.message },
            });
          } else {
            this.router.navigate([`create-prestation/${this.newPrestation.identifiantUsager}`], {
              queryParams: { message: mess.message },
            });
          }
        });
    }
    
  }




