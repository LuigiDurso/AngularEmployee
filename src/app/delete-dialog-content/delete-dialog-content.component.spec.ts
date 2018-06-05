import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogContentComponent } from './delete-dialog-content.component';

describe('DeleteDialogContentComponent', () => {
  let component: DeleteDialogContentComponent;
  let fixture: ComponentFixture<DeleteDialogContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDialogContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
