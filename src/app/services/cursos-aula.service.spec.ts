import { TestBed } from '@angular/core/testing';

import { CursosAulaService } from './cursos-aula.service';

describe('CursosAulaService', () => {
  let service: CursosAulaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursosAulaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
