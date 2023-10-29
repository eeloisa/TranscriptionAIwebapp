import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklistWordsComponent } from './blacklist-words.component';

describe('BlacklistWordsComponent', () => {
  let component: BlacklistWordsComponent;
  let fixture: ComponentFixture<BlacklistWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlacklistWordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlacklistWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
