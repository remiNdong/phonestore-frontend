import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.css']
})
export class EmployesComponent implements OnInit {

  employes?: User[];

  constructor(
   
    private userService: UserService,
    
  ) {}

  ngOnInit(): void {

    
    this.userService.listeEmployes().subscribe((emp) => {
      this.employes = emp;
    });

  }

}
