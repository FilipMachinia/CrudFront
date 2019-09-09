import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CarOwner} from '../models/carOwner';
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

  editPlate(oldCarOwner: CarOwner, carOwner: CarOwner): Observable<any> {
    return this.http.post('http://localhost:3000/editPlate', [oldCarOwner, carOwner]);
  }
  addPlate(carOwner: CarOwner): Observable<any> {
    return this.http.post('http://localhost:3000/addPlate', carOwner);
  }

  deletePlate(plate: CarOwner): Observable<any> {
    return this.http.delete(`http://localhost:3000/deletePlate/${plate.plate}`);
  }
}
