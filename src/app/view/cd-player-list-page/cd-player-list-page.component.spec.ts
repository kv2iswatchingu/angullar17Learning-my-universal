import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdPlayerListPageComponent } from './cd-player-list-page.component';

describe('CdPlayerListPageComponent', () => {
  let component: CdPlayerListPageComponent;
  let fixture: ComponentFixture<CdPlayerListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdPlayerListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CdPlayerListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
