import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPediaComponent } from './register-pedia.component';

describe('RegisterPediaComponent', () => {
  let component: RegisterPediaComponent;
  let fixture: ComponentFixture<RegisterPediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPediaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterPediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
