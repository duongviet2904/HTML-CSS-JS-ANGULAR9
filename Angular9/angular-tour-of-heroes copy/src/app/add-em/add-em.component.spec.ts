import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmComponent } from './add-em.component';

describe('AddEmComponent', () => {
  let component: AddEmComponent;
  let fixture: ComponentFixture<AddEmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
