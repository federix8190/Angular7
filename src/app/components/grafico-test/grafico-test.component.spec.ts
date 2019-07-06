import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoTestComponent } from './grafico-test.component';

describe('GraficoTestComponent', () => {
  let component: GraficoTestComponent;
  let fixture: ComponentFixture<GraficoTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
