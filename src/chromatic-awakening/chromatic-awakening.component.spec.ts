import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChromaticAwakeningComponent } from './chromatic-awakening.component';

describe('ChromaticAwakeningComponent', () => {
  let component: ChromaticAwakeningComponent;
  let fixture: ComponentFixture<ChromaticAwakeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChromaticAwakeningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChromaticAwakeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
