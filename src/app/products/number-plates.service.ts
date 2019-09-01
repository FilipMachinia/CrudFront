import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from './product';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumberPlatesService {
  constructor(private http: HttpClient) {
  }

  getPlates(): any {
    return this.http.get('http://localhost:3000/getPlates');
  }

  editPlate(oldProduct: Product, product: Product): Observable<any> {
    return this.http.post('http://localhost:3000/editPlate', [oldProduct, product]);
  }
  addPlate(product: Product): Observable<any> {
    return this.http.post('http://localhost:3000/addPlate', product);
  }

  deletePlate(plate: Product): Observable<any> {
    return this.http.delete(`http://localhost:3000/deletePlate/${plate.plate}`);
  }
}
