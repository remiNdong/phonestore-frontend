import { Injectable } from '@angular/core';
import { Modeletelephone } from '../model/modeletelephone.model';
import { Marque } from '../model/marque.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageDTO } from '../model/messageDTO.model';
import { apiURL } from '../config';
import { AuthService } from './auth.service';
import { AssociationmodelereparationDTO } from '../model/associationmodelereparationDTO.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ModeletelephoneService {
  modeles!: Modeletelephone[];
  modele!: Modeletelephone;
  idProduit!: number;
  marques!: Marque[];

  apiURLModeles: string = apiURL + 'modeles';
  apiURLMarques: string = apiURL + 'marques';
  apiURLAssociations: string = apiURL + 'associations';
  apiURLCreate: string = apiURL + 'modeles/addmodele';
  apiURLUpdate: string = apiURL + 'modeles/updatemodele';
  apiUrlImage:string= apiURL + 'image/uploadImage';
  apiUrlDeleteImage:string= apiURL + 'image/deleteImage';

  constructor(private http: HttpClient, private authService: AuthService) {}

  listeModeles(): Observable<Modeletelephone[]> {
    return this.http.get<Modeletelephone[]>(this.apiURLModeles);
  }

  consulterModele(id: number): Observable<Modeletelephone> {
    const url = `${this.apiURLModeles}/modele/${id}`;
    return this.http.get<Modeletelephone>(url);
  }

  updateModele(modele: Modeletelephone): Observable<MessageDTO> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    return this.http.put<MessageDTO>(this.apiURLUpdate, modele, {
      headers: httpHeaders,
    });
  }

  ajouterModele(modele: Modeletelephone): Observable<MessageDTO> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    return this.http.post<MessageDTO>(this.apiURLCreate, modele, {
      headers: httpHeaders,
    });
  }

  supprimerModele(modele: Modeletelephone) {
    const index = this.modeles?.indexOf(modele, 0)!;
    if (index > -1) {
      this.modeles?.splice(index, 1);
    }
  }

  listeMarques(): Observable<Marque[]> {
    return this.http.get<Marque[]>(this.apiURLMarques);
  }

  listeAssociations(id:number): Observable<AssociationmodelereparationDTO[]>{
    const url = `${this.apiURLAssociations}/liste/${id}`;
      return this.http.get<AssociationmodelereparationDTO[]>(url);
  }

  consulterMarque(id: number): Marque {
    return this.marques.find((marque) => marque.id == id)!;
  }

  rechercherPaMarque(idMarque: number): Observable<Modeletelephone[]> {
    const url = `${this.apiURLMarques}/${idMarque}`;
    return this.http.get<Modeletelephone[]>(url);
  }

  rechercherParTailleEcran(tailleEcran: number): Observable<Modeletelephone[]> {
    const url = `${this.apiURLModeles}/taille/${tailleEcran}`;
    return this.http.get<Modeletelephone[]>(url);
  }

  rechercherParTailleEcranRange(tailleEcranRange: number): Observable<Modeletelephone[]> {
    const url = `${this.apiURLModeles}/tailleEcranRange/${tailleEcranRange}`;
    return this.http.get<Modeletelephone[]>(url);
  }

  rechercherParCapaciteStockage(
    capaciteStockage: number
  ): Observable<Modeletelephone[]> {
    const url = `${this.apiURLModeles}/capacite/${capaciteStockage}`;
    return this.http.get<Modeletelephone[]>(url);
  }

  rechercherParPrix(prixRange: number): Observable<Modeletelephone[]> {
    const url = `${this.apiURLModeles}/prix/${prixRange}`;
    return this.http.get<Modeletelephone[]>(url);
  }

  uploadImage(file: File, filename: string, reference: string): Observable<any> {

    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiUrlImage}/${reference}`;
    return this.http.post(url, imageFormData, {
      headers: httpHeaders,
    });
  }


  deleteImage(imagePath : string) : Observable<any> {

    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    
    const url = `${this.apiUrlDeleteImage}/${imagePath}`;
    return this.http.delete(url,{
      headers: httpHeaders,
    });
  }
}
