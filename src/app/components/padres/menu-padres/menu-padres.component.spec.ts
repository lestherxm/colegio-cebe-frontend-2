import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPadresComponent } from './menu-padres.component';

describe('MenuPadresComponent', () => {
  let component: MenuPadresComponent;
  let fixture: ComponentFixture<MenuPadresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuPadresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuPadresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
