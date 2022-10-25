import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDocentesComponent } from './login-docentes.component';

describe('LoginDocentesComponent', () => {
  let component: LoginDocentesComponent;
  let fixture: ComponentFixture<LoginDocentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginDocentesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
