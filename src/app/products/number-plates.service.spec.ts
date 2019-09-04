import {async, TestBed} from '@angular/core/testing';

import { NumberPlatesService } from './number-plates.service';
import {ProductsComponent} from './products.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatDialogModule,
  MatDividerModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatPaginatorModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('NumberPlatesService', () => {
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
  }));

  it('should be created', () => {
    const service: NumberPlatesService = TestBed.get(NumberPlatesService);
    expect(service).toBeTruthy();
  });
});
