import { Marque } from './marque.model';

export class Modeletelephone {
  id?: number;
  reference?: string;
  prix?: number;
  tailleEcran?: number;
  capaciteStockage?: number;
  imagePath? : string;
  marqueDTO!: Marque;
}
