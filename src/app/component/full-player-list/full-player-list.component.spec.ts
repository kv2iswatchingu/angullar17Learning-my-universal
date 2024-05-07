import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullPlayerListComponent } from './full-player-list.component';

describe('FullPlayerListComponent', () => {
  let component: FullPlayerListComponent;
  let fixture: ComponentFixture<FullPlayerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullPlayerListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullPlayerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
