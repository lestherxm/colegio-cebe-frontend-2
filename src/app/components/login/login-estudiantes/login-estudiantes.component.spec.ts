import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEstudiantesComponent } from './login-estudiantes.component';

describe('LoginEstudiantesComponent', () => {
  let component: LoginEstudiantesComponent;
  let fixture: ComponentFixture<LoginEstudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginEstudiantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
