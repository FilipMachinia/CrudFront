import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditDialogComponent } from './edit-dialog.component';
import {FormsModule} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {NumberPlatesService} from '../number-plates.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('EditDialogComponent', () => {
  let component: EditDialogComponent;
  let fixture: ComponentFixture<EditDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDialogComponent ],
      providers: [
        NumberPlatesService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
      imports: [
        FormsModule,
        MatDialogModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
