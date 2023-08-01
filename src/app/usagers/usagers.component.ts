import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-usagers',
  templateUrl: './usagers.component.html',
  styleUrls: ['./usagers.component.css']
})
export class UsagersComponent  implements OnInit  {

  usagers?: User[];

  constructor(
    private userService: UserService,
    public authService: AuthService
  ) {}


  ngOnInit(): void {

    this.userService.listeUsagers().subscribe((usa) => {
      this.usagers = usa;
      
    });

  }

}
