import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveQuestionsComponent } from './active-questions.component';

describe('ActiveQuestionsComponent', () => {
  let component: ActiveQuestionsComponent;
  let fixture: ComponentFixture<ActiveQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
