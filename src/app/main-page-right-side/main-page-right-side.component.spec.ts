import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageRightSideComponent } from './main-page-right-side.component';

describe('MainPageRightSideComponent', () => {
  let component: MainPageRightSideComponent;
  let fixture: ComponentFixture<MainPageRightSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPageRightSideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainPageRightSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
