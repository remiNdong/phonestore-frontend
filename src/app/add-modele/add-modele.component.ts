import { Component, OnInit } from '@angular/core';
import { Modeletelephone } from '../model/modeletelephone.model';
import { ModeletelephoneService } from '../services/modeletelephone.service';
import { Marque } from '../model/marque.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageDTO } from '../model/messageDTO.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-add-modele',
  templateUrl: './add-modele.component.html',
  styleUrls: ['./add-modele.component.css'],
})
export class AddModeleComponent implements OnInit {
  marques!: Marque[];
  newIdMarque!: number;
  newMarque!: Marque;

  newModele = new Modeletelephone();

  message!: string;
  uploadedImage!: File;
  imagePath: any;

  constructor(
    private modeletelephoneService: ModeletelephoneService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.newModele.id = 0;
    this.newModele.imagePath = '';
    

    this.modeletelephoneService.listeMarques().subscribe((marquesTel) => {
      this.marques = marquesTel;
      console.log(this.marques);
    });

    this.route.queryParams
      .pipe(filter((params) => params['message']))
      .subscribe((params) => {
        console.log(params);

        this.message = params['message'];

        console.log(this.message);
      });
  }

  addModele() {
    if (this.uploadedImage=== undefined ||this.uploadedImage.name === undefined || !this.uploadedImage.name.endsWith('jpg')) {
      console.log(this.imagePath);
      this.router.navigate(['add-modele'], {
        queryParams: {
          message: 'Vous devez selectionner une image au format jpg',
        },
      });
   
    } else {
      this.newModele.marqueDTO = this.marques.find(
        (marque) => marque.id == this.newIdMarque
      )!;

      this.modeletelephoneService
        .ajouterModele(this.newModele)
        .subscribe((mess) => {
          if (mess.message === 'Création nouveau modèle réussie') {
            this.modeletelephoneService
              .uploadImage(
                this.uploadedImage,
                this.uploadedImage.name,
                this.newModele.reference!
              )
              .subscribe((response: any) => {});

            this.router.navigate(['modeles'], {
              queryParams: { message: mess.message },
            });
          } else {
            this.router.navigate(['add-modele'], {
              queryParams: { message: mess.message },
            });
          }
        });
    }
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => {
      this.imagePath = reader.result;
    };
  }
}
