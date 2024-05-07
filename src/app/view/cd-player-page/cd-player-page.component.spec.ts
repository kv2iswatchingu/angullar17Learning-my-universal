import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdPlayerPageComponent } from './cd-player-page.component';

describe('CdPlayerPageComponent', () => {
  let component: CdPlayerPageComponent;
  let fixture: ComponentFixture<CdPlayerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdPlayerPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CdPlayerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
