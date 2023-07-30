import { Component, OnInit } from '@angular/core';
import { AssociationmodelereparationDTO } from '../model/associationmodelereparationDTO.model';
import { ModeletelephoneService } from '../services/modeletelephone.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-update-association',
  templateUrl: './update-association.component.html',
  styleUrls: ['./update-association.component.css'],
})
export class UpdateAssociationComponent implements OnInit {
  currentAssociation = new AssociationmodelereparationDTO();
  message!: string;

  constructor(
    private modeletelephoneService: ModeletelephoneService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.modeletelephoneService
      .consulterAssociation(this.activatedRoute.snapshot.params['id'])
      .subscribe((asso) => {
        this.currentAssociation = asso;
      });

    this.activatedRoute.queryParams
      .pipe(filter((params) => params['message']))
      .subscribe((params) => {
        console.log(params);

        this.message = params['message'];

        console.log(this.message);
      });
  }

  updateAssociation() {
    this.modeletelephoneService
      .updateAssociation(this.currentAssociation)
      .subscribe((mess) => {
        if (mess.message === 'Modification de la réparation réussie') {

          this.router.navigate([`/associations-modele/${this.currentAssociation.idModeletelephone}`], {
            queryParams: { message: mess.message },
          });


        }else{

          this.router.navigate([`/update-association/${this.currentAssociation.id}`], {
            queryParams: { message: mess.message },
          });

        }
      });
  }
}
