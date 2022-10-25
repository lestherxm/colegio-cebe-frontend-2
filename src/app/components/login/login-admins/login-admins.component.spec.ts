import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAdminsComponent } from './login-admins.component';

describe('LoginAdminsComponent', () => {
  let component: LoginAdminsComponent;
  let fixture: ComponentFixture<LoginAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginAdminsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
