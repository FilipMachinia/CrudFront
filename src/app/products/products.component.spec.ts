import {async, ComponentFixture, TestBed} from '@angular/core/testing';

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
import {NumberPlatesService} from './number-plates.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let compiled;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsComponent],
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
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [NumberPlatesService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form tests', () => {
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

    it('plate and name field validity', () => {
      let name = component.carOwnerForm.controls.name;
      let plate = component.carOwnerForm.controls.plate;

      expect(name.valid).toBeFalsy();
      expect(plate.valid).toBeFalsy();

      name.setValue('');
      plate.setValue('');
      expect(name.hasError('required')).toBeTruthy();
      expect(plate.hasError('required')).toBeTruthy();

      name.setValue('john');
      plate.setValue('AA');
      expect(name.errors).toBeFalsy();
      expect(plate.errors).toBeTruthy();

      name.setValue('a');
      plate.setValue('AA11AAA');
      expect(name.errors).toBeTruthy();
      expect(plate.errors).toBeFalsy();

      name.setValue('james');
      plate.setValue('AA11AAA');
      expect(plate.errors).toBeFalsy();
      expect(plate.errors).toBeFalsy();
    });
  });

  describe('test table', () => {
    it('initialise table', () => {
      expect(component.dataSource.data).toBeTruthy();
      expect(compiled.querySelector('h1').textContent).toContain('Number plate list');
      expect(compiled.querySelector('table').textContent).toContain('Owner nameNumber plateEditDelete');
    });
  });
});
