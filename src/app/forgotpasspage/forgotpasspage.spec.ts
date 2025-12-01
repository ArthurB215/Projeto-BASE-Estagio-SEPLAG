import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Forgotpasspage } from './forgotpasspage';

describe('Forgotpasspage', () => {
  let component: Forgotpasspage;
  let fixture: ComponentFixture<Forgotpasspage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Forgotpasspage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Forgotpasspage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
