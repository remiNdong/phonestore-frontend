import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelesComponent } from './modeles/modeles.component';
import { AddModeleComponent } from './add-modele/add-modele.component';
import { UpdateModeleComponent } from './update-modele/update-modele.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ModeletelephoneGuard } from './modeletelephone.guard';
import { UserGuard } from './user.guard';
import { AddUserComponent } from './add-user/add-user.component';
import { SuccesComponent } from './succes/succes.component';
import { AssociationsModeleComponent } from './associations-modele/associations-modele.component';
import { AddAssociationComponent } from './add-association/add-association.component';
import { UpdateAssociationComponent } from './update-association/update-association.component';
import { UsagersComponent } from './usagers/usagers.component';
import { UsagerComponent } from './usager/usager.component';
import { UpdatePrestationComponent } from './update-prestation/update-prestation.component';
import { CreatePrestationComponent } from './create-prestation/create-prestation.component';
import { EmployesComponent } from './employes/employes.component';
import { EmployesGuard } from './employes.guard';


const routes: Routes = [
  {path: "modeles", component : ModelesComponent},
  {path: "add-modele", component : AddModeleComponent, canActivate:[ModeletelephoneGuard]},
  { path: "", redirectTo: "modeles", pathMatch: "full" },
  {path: "updateModele/:id", component: UpdateModeleComponent} ,
  {path: 'login', component: LoginComponent},
  {path: 'app-forbidden', component: ForbiddenComponent},
  {path: "add-user", component : AddUserComponent, canActivate:[UserGuard]},
  {path: "succes", component : SuccesComponent, canActivate:[UserGuard]},
  {path: "associations-modele/:id", component: AssociationsModeleComponent},
  {path: "add-association", component : AddAssociationComponent, canActivate:[ModeletelephoneGuard]},
  {path: "update-association/:id", component : UpdateAssociationComponent, canActivate:[ModeletelephoneGuard]},
  {path: "usagers", component : UsagersComponent, canActivate:[ModeletelephoneGuard]},
  {path: "usager/:username", component : UsagerComponent},
  {path: "update-prestation/:id", component : UpdatePrestationComponent},
  {path: "create-prestation/:username", component : CreatePrestationComponent, canActivate:[ModeletelephoneGuard]},
  {path: "employes", component : EmployesComponent, canActivate:[EmployesGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
