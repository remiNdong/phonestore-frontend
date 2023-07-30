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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
