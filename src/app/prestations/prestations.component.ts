import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Prestation } from '../model/prestation.model';
import { PrestationService } from '../services/prestation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-prestations',
  templateUrl: './prestations.component.html',
  styleUrls: ['./prestations.component.css']
})
export class PrestationsComponent implements OnInit {

  prestations?: Prestation[];
  identifiantClient!: string;
  message!:string;
  message2!:string;
  message3!:string;
  numeroSerie!:string;
  idPrestation!:number;
  resultat!:string;

  @ViewChild('formNumSerie') formNumSerie!: NgForm;
  @ViewChild('formMail') formMail!: NgForm;
  @ViewChild('formIdPrestation') formIdPrestation!: NgForm;

  constructor(
    private router: Router,
    private prestationService: PrestationService,
    public authService: AuthService,
    private route: ActivatedRoute
      ) {}

  ngOnInit(): void {
    this.prestationService.listeAllPrestations().subscribe((presta) => {
      this.prestations = presta;
    });

  }



  rechercherPrestationParIdClient(){

    
    let regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    let testMail: boolean;
    testMail = regexp.test(this.identifiantClient);
    


    if (!testMail) {
    
      
      this.message= 'Vous devez entrer un mail';
      this.message2='';
      this.message3='';
      this.resultat='';

}else{
this.prestationService.listePrestations(this.identifiantClient).subscribe((presta) => {
  this.prestations = presta;
  this.message = '';
  this.message2='';
  this.message3='';
  
  this.resultat='';



  if(this.prestations?.length===0){
   this.resultat='Aucune prestations trouvée avec ces informations';
   }
});
}


  }

  rechercherPrestationParNumSerie(){

    if(this.formNumSerie.invalid){
      
      this.message2= 'Vous devez entrer un numero de Série';
      this.message='';
      this.message3='';
      this.resultat='';

}else{
this.prestationService.listePrestationsByNumSerie(this.numeroSerie).subscribe((presta) => {
  this.prestations = presta;
  this.message = '';
  this.message2='';
  this.message3='';
  
  this.resultat='';



  if(this.prestations?.length===0){
   this.resultat='Aucune prestations trouvée avec ces informations';
   }
});
}


  }

  rechercherPrestationParIdPrestation(){

    if(this.formIdPrestation.invalid){
      
      this.message3= 'Vous devez entrer un Identifiant de prestation';
      this.message='';
      this.message2='';
      this.resultat='';

}else{
this.prestationService.listePrestationsId(this.idPrestation).subscribe((presta) => {
  this.prestations = presta;
  this.message = '';
  this.message2='';
  this.message3='';
  
  this.resultat='';



  if(this.prestations?.length===0){
   this.resultat='Aucune prestations trouvée avec ces informations';
   }
});
}

  }

  afficherTousPrestations(){

    this.message = '';
    this.message2='';
    this.message3='';

    this.prestationService.listeAllPrestations().subscribe((presta) => {
      this.prestations = presta;
      this.resultat='';
    });


  }

}
