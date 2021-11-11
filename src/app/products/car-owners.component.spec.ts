import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

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
import {NumberPlatesService} from './number-plates.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('ProductsComponent', () => {
  let component: CarOwnersComponent;
  let fixture: ComponentFixture<CarOwnersComponent>;
  let compiled;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CarOwnersComponent],
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
    fixture = TestBed.createComponent(CarOwnersComponent);
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
      expect(compiled.querySelector('h1').textContent).toContain('Car owner list');
      expect(compiled.querySelector('table').textContent).toContain('Owner nameNumber plateEditDelete');
    });
  });

  describe('test sorting', () => {
    it('empty array sort', () => {
      const testArr = [];
      const arrAfterSort = [];
      expect(component.sortCarOwners(testArr)).toEqual(arrAfterSort);
    });

    it('array sort', () => {
      const testArr = [{name: 'john', plate: 'aa11aaa'}, {name: 'alex', plate: 'aa11ads'}, {name: 'mike', plate: 'bb22bbb'}];
      const arrAfterSort = [{name: 'alex', plate: 'aa11ads'}, {name: 'john', plate: 'aa11aaa'}, {name: 'mike', plate: 'bb22bbb'}];
      expect(component.sortCarOwners(testArr)).toEqual(arrAfterSort);
    });
  });
});
