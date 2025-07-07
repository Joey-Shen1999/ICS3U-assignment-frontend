import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentDetail } from './assignment-detail';

describe('AssignmentDetail', () => {
  let component: AssignmentDetail;
  let fixture: ComponentFixture<AssignmentDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
