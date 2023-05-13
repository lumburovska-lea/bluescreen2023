import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerPopUpComponent } from './influencer-pop-up.component';

describe('InfluencerPopUpComponent', () => {
  let component: InfluencerPopUpComponent;
  let fixture: ComponentFixture<InfluencerPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfluencerPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfluencerPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
