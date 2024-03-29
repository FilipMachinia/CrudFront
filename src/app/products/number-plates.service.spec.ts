import { TestBed, waitForAsync } from '@angular/core/testing';

import {NumberPlatesService} from './number-plates.service';
import {CarOwnersComponent} from './car-owners.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CarOwner} from '../models/carOwner';

describe('NumberPlatesService', async () => {
  let service: NumberPlatesService;
  let httpMock: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({}));
  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        FormsModule
      ]
    })
      .compileComponents();

    service = TestBed.get(NumberPlatesService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });
  describe('basic tests', () => {
    it('should be created', () => {
      service = TestBed.get(NumberPlatesService);
      expect(service).toBeTruthy();
    });

    it('functions should be declared', async () => {
      expect(service.getPlates).toBeTruthy();
      expect(service.addPlate).toBeTruthy();
      expect(service.editPlate).toBeTruthy();
      expect(service.deletePlate).toBeTruthy();
    });
  });

  describe('test requests', () => {

    it('getPlates', () => {
      const dummyPlates = [{name: 'john', plate: 'aa11aaa'}, {name: 'mike', plate: 'bb22bbb'}];
      service.getPlates().subscribe((res) => {
        expect(res.length).toBe(2);
        expect(res).toBe(dummyPlates);
      });

      const request = httpMock.expectOne('http://localhost:3000/getPlates');
      expect(request.request.method).toBe('GET');
      request.flush(dummyPlates);
    });

    it('should addPlate', () => {
      const dummyPlate: CarOwner = {name: 'john', plate: 'aa11aaa'};
      service.addPlate(dummyPlate).subscribe((res) => {
        expect(res).toEqual({name: 'john', plate: 'aa11aaa'});
      });

      const request = httpMock.expectOne('http://localhost:3000/addPlate');
      expect(request.request.method).toBe('POST');
      request.flush(dummyPlate);
    });

    it('should editPlate', () => {
      const dummyOldPlate: CarOwner = {name: 'john', plate: 'aa11aaa'};
      const dummyNewPlate: CarOwner = {name: 'john', plate: 'aa11bbb'};
      service.editPlate(dummyOldPlate, dummyNewPlate).subscribe((res) => {
        expect(res).toEqual([{name: 'john', plate: 'aa11aaa'}, {name: 'john', plate: 'aa11bbb'}]);
      });

      const request = httpMock.expectOne('http://localhost:3000/editPlate');
      expect(request.request.method).toBe('POST');
      request.flush([dummyOldPlate, dummyNewPlate]);
    });

    it('should deletePlate', () => {
      const dummyPlate: CarOwner = {name: 'john', plate: 'aa11aaa'};
      service.deletePlate(dummyPlate).subscribe((res) => {
        expect(res).toEqual({name: 'john', plate: 'aa11aaa'});
      });

      const request = httpMock.expectOne(`http://localhost:3000/deletePlate/${dummyPlate.plate}`);
      expect(request.request.method).toBe('DELETE');
      request.flush(dummyPlate);
    });
  });

});
