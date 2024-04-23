import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdlistComponent } from './cdlist.component';

describe('CdlistComponent', () => {
  let component: CdlistComponent;
  let fixture: ComponentFixture<CdlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CdlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
