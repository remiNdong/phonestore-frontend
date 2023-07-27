import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeletelephoneService } from '../services/modeletelephone.service';
import { Modeletelephone } from '../model/modeletelephone.model';
import { Marque } from '../model/marque.model';
import { filter } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-update-modele',
  templateUrl: './update-modele.component.html',
  styles: [],
})
export class UpdateModeleComponent implements OnInit {
  marques!: Marque[];
  updatedMarqueId!: number;

  currentModele = new Modeletelephone();
  message!: string;
  myImage!: string;
  uploadedImage!: File;
  isImageUpdated: Boolean = false;
  apiurl: string = 'http://localhost:8080/api/image';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modeletelephoneService: ModeletelephoneService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.modeletelephoneService.listeMarques().subscribe((marquesTel) => {
      this.marques = marquesTel;
      console.log(this.marques);
    });

    this.modeletelephoneService
      .consulterModele(this.activatedRoute.snapshot.params['id'])
      .subscribe((mod) => {
        this.currentModele = mod;
        this.updatedMarqueId = this.currentModele.marqueDTO.id;
      });

    this.activatedRoute.queryParams
      .pipe(filter((params) => params['message']))
      .subscribe((params) => {
        console.log(params);

        this.message = params['message'];

        console.log(this.message);
      });
  }

  updateModele() {
    if (
      this.isImageUpdated &&
      (this.uploadedImage.name === undefined ||
        !this.uploadedImage.name.endsWith('jpg'))
    ) {
      console.log(this.myImage);
      this.router.navigate([`/updateModele/${this.currentModele.id}`], {
        queryParams: {
          message: 'Vous devez selectionner une image au format jpg',
        },
      });
    } else {
      this.currentModele.marqueDTO = this.marques.find(
        (marque) => marque.id == this.updatedMarqueId
      )!;

      this.modeletelephoneService
        .updateModele(this.currentModele)
        .subscribe((mess) => {
          if (mess.message === 'Modification du modèle réussie') {
            if (this.isImageUpdated) {
              this.modeletelephoneService
                .deleteImage(this.currentModele.imagePath!)
                .subscribe((response: any) => {});

              this.modeletelephoneService
                .uploadImage(
                  this.uploadedImage,
                  this.uploadedImage.name,
                  this.currentModele.reference!
                )
                .subscribe((response: any) => {});
            }

            this.router.navigate(['modeles'], {
              queryParams: { message: mess.message },
            });
          } else {
            this.router.navigate([`/updateModele/${this.currentModele.id}`], {
              queryParams: { message: mess.message },
            });
          }
        });
    }
  }

  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => {
        this.myImage = reader.result as string;
      };
    }
  }
}
