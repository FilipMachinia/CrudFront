import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {MatToolbarModule} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        MatToolbarModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    let component = fixture.componentInstance;


    fixture.detectChanges();
    expect(component.title).toContain('Crud App');
  });
});
