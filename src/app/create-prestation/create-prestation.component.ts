import { Component, OnInit } from '@angular/core';
import { Marque } from '../model/marque.model';
import { ModeletelephoneService } from '../services/modeletelephone.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Modeletelephone } from '../model/modeletelephone.model';
import { AssociationmodelereparationDTO } from '../model/associationmodelereparationDTO.model';
import { PrestationCreationDTO } from '../model/prestationCreationDTO.model';

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
  identifiantUsager! : string;
  


  constructor(
    private modeletelephoneService: ModeletelephoneService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  
  ngOnInit(): void{

    this.identifiantUsager= this.route.snapshot.params['username'];


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
    .listeAssociations(this.newPrestation.idModele)
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
    
  }



}
