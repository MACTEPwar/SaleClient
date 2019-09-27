import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertModalComponent } from './alert-modal.component';
import { ModalContext } from 'src/app/@_modules/modal/modal-context';

describe('AlertModalComponent', () => {
  let component: AlertModalComponent;
  let fixture: ComponentFixture<AlertModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertModalComponent ],
      providers:[ModalContext]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
