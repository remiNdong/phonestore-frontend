import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModelesComponent } from './modeles/modeles.component';
import { AddModeleComponent } from './add-modele/add-modele.component';
import { UpdateModeleComponent } from './update-modele/update-modele.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AddUserComponent } from './add-user/add-user.component';
import { SuccesComponent } from './succes/succes.component';
import { AssociationsModeleComponent } from './associations-modele/associations-modele.component';
import { AddAssociationComponent } from './add-association/add-association.component';
import { UpdateAssociationComponent } from './update-association/update-association.component';

@NgModule({
  declarations: [
    AppComponent,
    ModelesComponent,
    AddModeleComponent,
    UpdateModeleComponent,
    LoginComponent,
    ForbiddenComponent,
    AddUserComponent,
    SuccesComponent,
    AssociationsModeleComponent,
    AddAssociationComponent,
    UpdateAssociationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
