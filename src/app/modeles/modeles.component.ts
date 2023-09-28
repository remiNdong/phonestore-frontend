import { Component, OnInit } from '@angular/core';
import { Modeletelephone } from '../model/modeletelephone.model';
import { ModeletelephoneService } from '../services/modeletelephone.service';
import { MessageDTO } from '../model/messageDTO.model';
import { filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Marque } from '../model/marque.model';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RecherchemodeleDTO } from '../model/recherchemodeleDTO.model';

@Component({
  selector: 'app-modeles',
  templateUrl: './modeles.component.html',
  styleUrls: ['./modeles.component.css'],
})
export class ModelesComponent implements OnInit {
  modeles?: Modeletelephone[];
  message!: string;
  marques!: Marque[];
  //idMarque!: number;
  //tailleEcran! : number;
  //capaciteStockage! : number;
 // prixRange! : number;
 // tailleEcranRange! : number;

  recherchemodeleDTO= new RecherchemodeleDTO();
  apiUrlImage:string='http://localhost:8080/api/image';


  formRecherche = new FormGroup({
    marqueForm : new FormControl(''),
    tailleForm : new FormControl(''),
    capaciteForm : new FormControl(''),
    prixForm : new FormControl('')
  });
  /*
  formDataMarque = new FormGroup({
    marqueForm : new FormControl('')
  });



  formDataTaille = new FormGroup({
    tailleForm : new FormControl('')
  });

  formDataCapacite = new FormGroup({
   capaciteForm : new FormControl('')
  });

  formDataPrix = new FormGroup({
    prixForm : new FormControl('')
   });
   */

  constructor(
    private modeletelephoneService: ModeletelephoneService,
    private route: ActivatedRoute,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.modeletelephoneService.listeMarques().subscribe((mar) => {
      this.marques = mar;
      console.log(mar);
    });

    this.modeletelephoneService.listeModeles().subscribe((modelesTel) => {
      console.log(modelesTel);
      this.modeles = modelesTel;
    });

    this.route.queryParams
      .pipe(filter((params) => params['message']))
      .subscribe((params) => {
        console.log(params);

        this.message = params['message'];

        console.log(this.message);
      });
  }

  rechercherModele(){

    this.modeletelephoneService
    .rechercherModeles(this.recherchemodeleDTO)
    .subscribe((mod) => {
      this.modeles = mod;
    });


  }
  /*
  onChange() {
    this.modeletelephoneService
      .rechercherPaMarque(this.idMarque)
      .subscribe((mod) => {
        this.modeles = mod;
      });
      this.formDataTaille.reset({});
      this.formDataCapacite.reset({});
      this.formDataPrix.reset({});
  }

  onChangeTailleEcran() {
    this.modeletelephoneService
      .rechercherParTailleEcran(this.tailleEcran)
      .subscribe((mod) => {
        this.modeles = mod;
      });
      this.formDataMarque.reset({});
      this.formDataCapacite.reset({});
      this.formDataPrix.reset({});
  }

  onChangeTailleEcranRange() {
    this.modeletelephoneService
      .rechercherParTailleEcranRange(this.tailleEcranRange)
      .subscribe((mod) => {
        this.modeles = mod;
      });
      this.formDataMarque.reset({});
      this.formDataCapacite.reset({});
      this.formDataPrix.reset({});
  }

  onChangeCapaciteStockage() {
    this.modeletelephoneService
      .rechercherParCapaciteStockage(this.capaciteStockage)
      .subscribe((mod) => {
        this.modeles = mod;
      });
      this.formDataTaille.reset({});
      this.formDataMarque.reset({});
      this.formDataPrix.reset({});
  }

  onChangePrix() {

    this.modeletelephoneService
      .rechercherParPrix(this.prixRange)
      .subscribe((mod) => {
        this.modeles = mod;
      });
      this.formDataTaille.reset({});
      this.formDataMarque.reset({});
      this.formDataCapacite.reset({});
  }
  */

  afficherTousModeles(){
    this.modeletelephoneService
    .listeModeles()
    .subscribe((mod) => {
      this.modeles = mod;
    });

    this.formRecherche.reset({});

   // this.formDataTaille.reset({});
   // this.formDataMarque.reset({});
   // this.formDataCapacite.reset({});
   // this.formDataPrix.reset({});
  }

  supprimerModele(modele: Modeletelephone) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) this.modeletelephoneService.supprimerModele(modele);
  }
}
