import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatDividerModule, MatIconModule, MatProgressSpinnerModule, MatTableModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';

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
        MatDialogModule
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
    expect(component.selectedProduct.valid).toBeFalsy();
  });

  it('name field validity', () => {
    let name = component.selectedProduct.controls['name'];
    expect(name.valid).toBeFalsy();

    name.setValue("");
    expect(name.hasError('required')).toBeTruthy();

    name.setValue("A");
    expect(name.errors.minlength).toBeTruthy();

    name.setValue("John");
    expect(name.errors.minlength).toBeTruthy();
  });

  it('plate field validity', () => {
    let plate = component.selectedProduct.controls['plate'];
    expect(plate.valid).toBeFalsy();

    name.setValue("");
    expect(plate.hasError('required')).toBeTruthy();

    name.setValue("AA");
    expect(plate.errors).toBeTruthy();

    name.setValue("AA11");
    expect(plate.errors).toBeTruthy();

    name.setValue("AA11AAA");
    expect(plate.errors).toBeFalsy();
  });
});
