import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-succes',
  templateUrl: './succes.component.html',
  styleUrls: ['./succes.component.css']
})
export class SuccesComponent {

  constructor(
  
    public authService: AuthService,
   
  ) {}

}
