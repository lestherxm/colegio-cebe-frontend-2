import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAlumnosComponent } from './menu-alumnos.component';

describe('MenuAlumnosComponent', () => {
  let component: MenuAlumnosComponent;
  let fixture: ComponentFixture<MenuAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuAlumnosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
