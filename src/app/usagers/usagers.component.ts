import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-usagers',
  templateUrl: './usagers.component.html',
  styleUrls: ['./usagers.component.css'],
})
export class UsagersComponent implements OnInit {
  usagers?: User[];
  nomClient!: string;
  message!: string;
  message2!: string;
  mailClient! : string;
  resultat! : string;



  @ViewChild('formNom') formNom!: NgForm;
  @ViewChild('formMail') formMail!: NgForm;

  constructor(
    private router: Router,
    private userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //this.route.queryParams
    //  .pipe(filter((params) => params['message']))
    //  .subscribe((params) => {
    //    this.message = params['message'];
   //   });

  

    this.userService.listeUsagers().subscribe((usa) => {
      this.usagers = usa;
    });
  }

  rechercherClientParNom() {
   // if (this.nomClient === '' || this.nomClient===undefined || this.nomClient===null) {
    //  this.router.navigate(['usagers'], {
    //    queryParams: {
      //    message: 'Vous devez entrer un nom',
      //  },
     // });
    
     if(this.formNom.invalid){
     
            this.message= 'Vous devez entrer un nom';
            this.message2='';
            this.resultat='';
     
    }else{
      this.userService.rechercherParNom(this.nomClient).subscribe((usa) => {
        this.usagers = usa;
        this.message = '';
        this.message2='';
        this.nomClient='';
        this.resultat='';
        if(this.usagers?.length===0){

          this.resultat='Aucun client trouvé avec ces informations';
          }
      });
    }

  
  }


  rechercherClientParMail() {
    
    let regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    let testMail: boolean;
    testMail = regexp.test(this.mailClient);
    


    if (!testMail) {
    
      
      this.message2= 'Vous devez entrer un mail';
      this.message='';
      this.resultat='';

}else{
       this.userService.rechercherParMail(this.mailClient).subscribe((usa) => {
         this.usagers = usa;
         this.message = '';
         this.message2='';
         this.nomClient='';
         this.resultat='';

     

         if(this.usagers?.length===0){
          this.resultat='Aucun client trouvé avec ces informations';
          }
       });
     }

   

   }

  afficherTousClients(){



    this.message = '';
    this.message2='';
    this.nomClient='';
    this.userService.listeUsagers().subscribe((usa) => {
      this.usagers = usa;
      this.resultat='';
    });



  }
}
