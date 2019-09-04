import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
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

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatIconModule,
        MatTableModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        HttpClientModule,
        MatDialogModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatInputModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.carOwnerForm.valid).toBeFalsy();
  });

  it('name field validity', () => {
    let name = component.carOwnerForm.controls.name;
    expect(name.valid).toBeFalsy();

    name.setValue('');
    expect(name.hasError('required')).toBeTruthy();

    name.setValue('A');
    expect(name.errors.minlength).toBeTruthy();

    name.setValue('John');
    expect(name.invalid).toBeFalsy();
  });

  it('plate field validity', () => {
    let plate = component.carOwnerForm.controls.plate;
    expect(plate.valid).toBeFalsy();

    plate.setValue('');
    expect(plate.hasError('required')).toBeTruthy();

    plate.setValue('AA');
    expect(plate.errors).toBeTruthy();

    plate.setValue('AA11');
    expect(plate.errors).toBeTruthy();

    plate.setValue('AA11AAA');
    expect(plate.errors).toBeFalsy();
  });

  it('initialise table', () => {
    expect(component.dataSource.data).toBeTruthy();
  });
});
