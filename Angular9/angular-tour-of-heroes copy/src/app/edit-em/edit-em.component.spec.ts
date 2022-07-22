import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmComponent } from './edit-em.component';

describe('EditEmComponent', () => {
  let component: EditEmComponent;
  let fixture: ComponentFixture<EditEmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
