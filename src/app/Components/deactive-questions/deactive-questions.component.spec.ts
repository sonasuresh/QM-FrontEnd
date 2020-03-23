import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactiveQuestionsComponent } from './deactive-questions.component';

describe('DeactiveQuestionsComponent', () => {
  let component: DeactiveQuestionsComponent;
  let fixture: ComponentFixture<DeactiveQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeactiveQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactiveQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
