import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Character3dComponent } from './character3d.component';

describe('Character3dComponent', () => {
  let component: Character3dComponent;
  let fixture: ComponentFixture<Character3dComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Character3dComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Character3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
