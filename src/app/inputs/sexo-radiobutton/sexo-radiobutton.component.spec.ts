import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SexoRadiobuttonComponent } from './sexo-radiobutton.component';

describe('SexoRadiobuttonComponent', () => {
  let component: SexoRadiobuttonComponent;
  let fixture: ComponentFixture<SexoRadiobuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SexoRadiobuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SexoRadiobuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
