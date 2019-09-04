import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogComponent } from './edit-dialog.component';
import {FormsModule} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material';
import {NumberPlatesService} from '../number-plates.service';

describe('EditDialogComponent', () => {
  let component: EditDialogComponent;
  let fixture: ComponentFixture<EditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDialogComponent ],
      providers: [
        NumberPlatesService
      ],
      imports: [
        FormsModule,
        MatDialogModule
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
