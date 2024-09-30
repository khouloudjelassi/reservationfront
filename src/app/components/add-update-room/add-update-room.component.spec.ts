import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateRoomComponent } from './add-update-room.component';

describe('AddUpdateRoomComponent', () => {
  let component: AddUpdateRoomComponent;
  let fixture: ComponentFixture<AddUpdateRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateRoomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
